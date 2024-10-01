import axiosInstance from "./AxiosInstance";

export const registerUser = async (
  registration_email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  const data = {
    email: registration_email,
    password: password,
    first_name: firstName,
    last_name: lastName,
  };

  const response = await axiosInstance.post("/users/register/", data);
  return response;
};
