import axiosInstance from "./AxiosInstance";

export interface AuthResponse {
  access: string;
  refresh: string;
}

export const getToken = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const data = {
    email: email,
    password: password,
  };

  const response = await axiosInstance.post("/auth/token/", data);

  if (response.status === 200) {
    return response.data as AuthResponse;
  } else {
    throw new Error("Failed to authenticate");
  }
};

export const refreshTokens = async (
  refreshToken: string
): Promise<AuthResponse> => {
  const data = {
    refresh: refreshToken,
  };

  const response = await axiosInstance.post("/auth/token/refresh/", data);

  if (response.status === 200) {
    console.log("tokens successfully refreshed");
    return response.data as AuthResponse;
  } else {
    console.log("failed to refresh tokens", response.status);
    throw new Error("Failed to refresh token");
  }
};
