import axiosInstance from "./AxiosInstance";

export const registerUserWithNewOrg = async (
  registration_email: string,
  password: string,
  firstName: string,
  lastName: string,
  new_organization_name: string
) => {
  const data = {
    email: registration_email,
    password: password,
    first_name: firstName,
    last_name: lastName,
    new_organization_name: new_organization_name,
  };

  const response = await axiosInstance.post(
    "/users/register/new-organization/",
    data
  );
  return response;
};

export const registerUserWithJoinCode = async (
  registration_email: string,
  password: string,
  firstName: string,
  lastName: string,
  join_code: string
) => {
  const data = {
    email: registration_email,
    password: password,
    first_name: firstName,
    last_name: lastName,
    join_code: join_code,
  };

  const response = await axiosInstance.post(
    "/users/register/join-organization/",
    data
  );
  return response;
};
