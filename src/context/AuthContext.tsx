import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { getRefreshToken, getToken } from "../utils/ApiHandlers/AuthHandler.ts";

// ------------------- Interfaces -------------------
// UPDATE INTERFACE WHEN UPDATING BACKEND AUTH TOKEN RESPONSE
export interface DecodedAuthToken {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;

  // custom token fields
  email: string;
  first_name: string;
  last_name: string;
}

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
    () => localStorage.getItem("accessToken") || ""
  );
  const [refreshToken, setRefreshToken] = useState<string>(
    () => localStorage.getItem("refreshToken") || ""
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // create user state
  const [user, setUser] = useState<DecodedAuthToken | null>(() =>
    accessToken ? jwtDecode<DecodedAuthToken>(accessToken) : null
  );

  /**
   * Handles user login.
   * This function is called from a form submission event.
   * The form should have two inputs: email and password.
   * It retrieves the email and password from the form,
   * attempts to get authentication tokens, and updates the state accordingly.
   * Use the promise returned by this function to navigate to the desired page after login.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {Promise<void>} - A promise that resolves when the login process is complete.
   */
  const login = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const { access, refresh } = await getToken(email, password);
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
  const contextValue: AuthContextType = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
  };

  useEffect(() => {
    const updateAuthTokens = async () => {
      console.log("Updating auth tokens");
      try {
        const { access, refresh } = await getRefreshToken(refreshToken);
        setAccessToken(access);
        setRefreshToken(refresh);
        setUser(jwtDecode<DecodedAuthToken>(access));
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
      } catch {
        logout();
      }
    };

    if (isLoading) {
      if (accessToken && refreshToken) {
        updateAuthTokens();
      }
      setIsLoading(false);
    }

    // 4 minutes
    const timeInterval = 1000 * 60 * 4;
    const intervalId = setInterval(() => {
      if (accessToken && refreshToken) {
        updateAuthTokens();
      }
    }, timeInterval);
    return () => clearInterval(intervalId);
  }, [isLoading, accessToken, refreshToken]);

  // return the AuthContext.Provider with the context value
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
