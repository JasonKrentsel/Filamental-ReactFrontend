import axiosInstance from "./AxiosInstance";

export const getPrivateData = async (endpoint: string, accessToken: string) => {
  const response = await axiosInstance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const postPrivateData = async (
  data: Record<string, unknown>,
  endpoint: string,
  accessToken: string
) => {
  const response = await axiosInstance.post(endpoint, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
