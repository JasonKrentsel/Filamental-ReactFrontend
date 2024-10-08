import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { refreshTokens, getToken } from "../utils/ApiHandlers/AuthHandler.ts";

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
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
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
  // Use useRef for tokens
  const accessTokenRef = useRef<string>(
    localStorage.getItem("accessToken") || ""
  );
  const refreshTokenRef = useRef<string>(
    localStorage.getItem("refreshToken") || ""
  );

  const [isLoggedIn, setIsLoggedIn] = useState(accessTokenRef.current !== "");

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
      accessTokenRef.current = access;
      refreshTokenRef.current = refresh;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles user logout.
   * This function clears the access and refresh tokens from both the current session
   * and local storage, effectively logging out the user.
   *
   * THIS DOES NOT RERENDER THE APP, OR NAVIGATE TO ANY PAGE
   * THAT FUNCTIONALITY IS UP TO THE COMPONENT USING THIS CONTEXT
   *
   * After calling this function, the user will be considered logged out,
   * and any authenticated API calls will fail until the user logs in again.
   *
   * @returns {void}
   */
  const logout = () => {
    accessTokenRef.current = "";
    refreshTokenRef.current = "";
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
  };

  /**
   * Updates the authentication tokens.
   * This function is used to refresh the access token when it is expired.
   * It retrieves the new access and refresh tokens from the server and updates the state accordingly.
   * If the refresh token is invalid, it calls the logout function.
   *
   * @returns {void}
   */
  const updateAuthTokens = useCallback(async () => {
    try {
      const { access, refresh } = await refreshTokens(refreshTokenRef.current);
      accessTokenRef.current = access;
      refreshTokenRef.current = refresh;
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } catch {
      logout();
    }
  }, []);

  /**
   * Sets up an interval to update the authentication tokens
   * This is used to keep the access token fresh for the duration of the session.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (isLoggedIn) {
      updateAuthTokens();
    }
    // 4 minutes
    const timeInterval = 1000 * 60 * 4;
    const intervalId = setInterval(() => {
      if (isLoggedIn) {
        updateAuthTokens();
      }
    }, timeInterval);
    return () => clearInterval(intervalId);
  }, [updateAuthTokens, isLoggedIn]);

  // context value, which is passed to the AuthContext.Provider
  const contextValue: AuthContextType = {
    isLoggedIn: isLoggedIn,
    accessToken: accessTokenRef.current,
    refreshToken: refreshTokenRef.current,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
