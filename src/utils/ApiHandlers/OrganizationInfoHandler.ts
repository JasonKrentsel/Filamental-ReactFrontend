import { getPrivateData, postPrivateData } from "./PrivateAPIHandler";

export type OrgDescription = {
  org_name: string;
  org_icon_src: string;
  org_id: string;
  org_root_directory_id: string;
};

export type NewOrganizationDescription = {
  new_org_name: string;
};

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
  const response = await postPrivateData(
    newOrg,
    "api/user/create-org/",
    accessToken
  );
  return response.data as OrgDescription;
};
