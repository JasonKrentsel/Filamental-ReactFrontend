import axiosInstance from "./AxiosInstance";

// TODO: implement for accessing API's with access token
export const getPrivateData = async (endpoint: string, accessToken: string) => {
  const response = await axiosInstance.get(endpoint);
  return response.data;
};
