import axiosInstance from "./AxiosInstance";

export const getPrivateData = async (
  endpoint: string,
  accessToken: string,
  maxRetries: number = 3,
  retryDelay: number = 500
) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await axiosInstance.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error: unknown) {
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
  data: Record<string, unknown>,
  endpoint: string,
  accessToken: string,
  maxRetries: number = 3,
  retryDelay: number = 500
) => {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await axiosInstance.post(endpoint, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response;
    } catch (error: unknown) {
      if (retries < maxRetries - 1) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        throw error;
      }
    }
  }
};
