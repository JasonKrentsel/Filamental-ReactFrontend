import {
  OrgDescription,
  NewOrganizationDescription,
} from "../datatypes/Organization";
import { getPrivateData, postPrivateData } from "./PrivateAPIHandler";

export const getUserOrgDescriptions = async (
  accessToken: string
): Promise<OrgDescription[]> => {
  const response = await getPrivateData(
    "api/user/org-descriptions/",
    accessToken
  );
  return (response.data as OrgDescription[]) || [];
};

export const createOrganization = async (
  newOrg: NewOrganizationDescription,
  accessToken: string
): Promise<OrgDescription> => {
  console.log(newOrg);
  const response = await postPrivateData(
    newOrg,
    "api/user/create-org/",
    accessToken
  );
  return response.data as OrgDescription;
};
