import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import {
  getToken,
  getRefreshToken,
  AuthResponse,
} from "../utils/ApiHandlers/AuthHandler.ts";
// ------------------- Interfaces -------------------
// UPDATE INTERFACE WHEN UPDATING BACKEND AUTH TOKEN RESPONSE
export interface DecodedAuthToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;

  // custom token fields
  username: string;
  email: string;
  organization_name: string;
  is_org_master: boolean;
}

// ------------------- Utility Functions -------------------

const isTokenExpired = (token: string): boolean => {
  if (token) {
    const decodedToken: DecodedAuthToken = jwtDecode<DecodedAuthToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp < currentTime;
  }
  return true;
};

const refreshAccessTokenIfExpired = (
  accessToken: string,
  refreshToken: string
): Promise<AuthResponse> => {
  // if refresh token is expired, return error
  if (isTokenExpired(refreshToken)) {
    return Promise.reject(new Error("Refresh token is expired"));
  }

  if (isTokenExpired(accessToken)) {
    // if access token is expired, but refresh token is not, refresh auth tokens
    return getRefreshToken(refreshToken);
  } else {
    // else, return the previous access and refresh tokens
    return Promise.resolve({ access: accessToken, refresh: refreshToken });
  }
};

// ------------------- Context -------------------

interface AuthContextType {
  user: DecodedAuthToken | null;
  accessToken: string;
  refreshToken: string;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: "",
  refreshToken: "",
  login: async () => {},
  logout: () => {},
});

export default AuthContext;

// ----- Provider -----

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // load tokens from local storage, if they exist
  const [accessToken, setAccessToken] = useState<string>(
    localStorage.getItem("accessToken") || ""
  );
  const [refreshToken, setRefreshToken] = useState<string>(
    localStorage.getItem("refreshToken") || ""
  );

  // create user state
  const [user, setUser] = useState<DecodedAuthToken | null>(null);

  // this useEffect checks over the Auth tokens
  // refreshAccessTokenIfExpired() is given the access and refresh tokens
  // if both tokens are valid, it "data" returns the previous access and refresh tokens
  // if the access token is expired, but the refresh token is not, it will be refreshed
  // if the access token is expired and the refresh token is expired, we will catch the error and set the user to logged out
  useEffect(() => {
    refreshAccessTokenIfExpired(accessToken, refreshToken)
      .then((data) => {
        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        setUser(jwtDecode<DecodedAuthToken>(data.access));
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
      })
      .catch(() => {
        // refresh token is expired
        // set to logged out state
        logout();
      });
  }, [user, accessToken, refreshToken]);

  /**
   * Handles user login.
   * This function is called from a form submission event.
   * The form should have two inputs: username and password.
   * It retrieves the username and password from the form,
   * attempts to get authentication tokens, and updates the state accordingly.
   * Use the promise returned by this function to navigate to the desired page after login.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the login process is complete.
   */
  const login = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
      const { access, refresh } = await getToken(username, password);
      setAccessToken(access);
      setRefreshToken(refresh);
      setUser(jwtDecode<DecodedAuthToken>(access));
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } catch (error) {
      console.error(error);
    }
  };

  // logout function
  const logout = () => {
    setUser(null);
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  // context value, which is passed to the AuthContext.Provider
  const contextValue = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
  };

  // return the AuthContext.Provider with the context value
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
