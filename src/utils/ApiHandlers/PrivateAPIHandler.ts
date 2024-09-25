import axiosInstance from "./AxiosInstance";

export const getPrivateData = async (endpoint: string, accessToken: string) => {
  const response = await axiosInstance.get(endpoint);
  return response.data;
};
