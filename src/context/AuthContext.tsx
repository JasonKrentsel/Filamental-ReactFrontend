import React, {
  createContext,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  refreshTokens,
  getToken,
  AuthContextType,
} from "../utils/ApiHandlers/AuthHandler";

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

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  getAccessToken: () => "",
  getRefreshToken: () => "",
  login: async () => {},
  logout: () => {},
  attemptTokenRefresh: async () => {},
});

export default AuthContext;

// ----- Provider -----

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const getAccessToken = useCallback(
    () => localStorage.getItem("accessToken") || "",
    []
  );
  const getRefreshToken = useCallback(
    () => localStorage.getItem("refreshToken") || "",
    []
  );

  const [isLoggedIn, setIsLoggedIn] = useState(getRefreshToken() !== "");

  const updateTokens = useCallback((access: string, refresh: string) => {
    if (access !== "") {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    setIsLoggedIn(access !== "");
  }, []);

  const login = useCallback(
    async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      try {
        const { access, refresh } = await getToken(email, password);
        updateTokens(access, refresh);
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    [updateTokens]
  );

  const logout = useCallback(() => {
    updateTokens("", "");
  }, [updateTokens]);

  const attemptTokenRefresh = useCallback(async () => {
    try {
      const { access, refresh } = await refreshTokens(getRefreshToken());
      updateTokens(access, refresh);
    } catch {
      logout();
    }
  }, [updateTokens, getRefreshToken, logout]);

  useEffect(() => {
    if (isLoggedIn) {
      attemptTokenRefresh();
    }
    // 4 minutes
    const timeInterval = 1000 * 60 * 4;
    const intervalId = setInterval(() => {
      if (isLoggedIn) {
        attemptTokenRefresh();
      }
    }, timeInterval);
    return () => clearInterval(intervalId);
  }, [attemptTokenRefresh, isLoggedIn]);

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      getAccessToken,
      getRefreshToken,
      login,
      logout,
      attemptTokenRefresh,
    }),
    [
      isLoggedIn,
      getAccessToken,
      getRefreshToken,
      login,
      logout,
      attemptTokenRefresh,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
