import axiosInstance from "./AxiosInstance";

export interface AuthResponse {
  access: string;
  refresh: string;
}

export const getToken = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const data = {
    username: username,
    password: password,
  };

  const response = await axiosInstance.post("accounts/api/token/", data);

  if (response.status === 200) {
    return response.data as AuthResponse;
  } else {
    throw new Error("Failed to authenticate");
  }
};

export const getRefreshToken = async (
  refreshToken: string
): Promise<AuthResponse> => {
  const data = {
    refresh: refreshToken,
  };

  const response = await axiosInstance.post(
    "accounts/api/token/refresh/",
    data
  );

  if (response.status === 200) {
    return response.data as AuthResponse;
  } else {
    throw new Error("Failed to refresh token");
  }
};
