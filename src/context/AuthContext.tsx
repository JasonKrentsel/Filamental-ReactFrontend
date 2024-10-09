import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
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
  const accessTokenRef = useRef<string>(
    localStorage.getItem("accessToken") || ""
  );
  const refreshTokenRef = useRef<string>(
    localStorage.getItem("refreshToken") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(accessTokenRef.current !== "");

  const updateTokens = useCallback((access: string, refresh: string) => {
    accessTokenRef.current = access;
    refreshTokenRef.current = refresh;
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

  const updateAuthTokens = useCallback(async () => {
    try {
      const { access, refresh } = await refreshTokens(refreshTokenRef.current);
      updateTokens(access, refresh);
    } catch {
      logout();
    }
  }, [updateTokens, logout]);

  useEffect(() => {
    if (isLoggedIn) {
      updateAuthTokens();
    }
    // 3 minutes
    const timeInterval = 1000 * 60 * 3;
    const intervalId = setInterval(() => {
      if (isLoggedIn) {
        updateAuthTokens();
      }
    }, timeInterval);
    return () => clearInterval(intervalId);
  }, [updateAuthTokens, isLoggedIn]);

  const contextValue = useMemo(
    () => ({
      isLoggedIn,
      accessToken: accessTokenRef.current,
      refreshToken: refreshTokenRef.current,
      login,
      logout,
    }),
    [isLoggedIn, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
