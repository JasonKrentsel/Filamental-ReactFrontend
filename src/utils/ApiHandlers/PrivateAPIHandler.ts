import { AuthContextType } from "./AuthHandler";
import axiosInstance from "./AxiosInstance";
import axios from "axios";

export const getPrivateData = async (
  authContext: AuthContextType,
  endpoint: string,
  maxRetries: number = 3,
  retryDelay: number = 500
) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${authContext.getAccessToken()}`,
        },
      });

      return response;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        authContext.logout();
        throw new Error("Unauthorized access. Logged out.");
      }
      if (retries < maxRetries - 1) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        throw error;
      }
    }
  }
};

export const postPrivateData = async (
  authContext: AuthContextType,
  endpoint: string,
  data: Record<string, unknown>
) => {
  try {
    const response = await axiosInstance.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${authContext.getAccessToken()}`,
      },
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      authContext.logout();
      throw new Error("Unauthorized access. Logged out.");
    }
    throw error;
  }
};
