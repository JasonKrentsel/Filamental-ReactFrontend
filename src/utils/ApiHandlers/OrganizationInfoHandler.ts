import { getPrivateData, postPrivateData } from "./PrivateAPIHandler";
import { AuthContextType } from "./AuthHandler";

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
  authContext: AuthContextType
): Promise<OrgDescription[]> => {
  const response = await getPrivateData(
    authContext,
    "api/user/org-descriptions/"
  );
  return (response?.data as OrgDescription[]) || [];
};

export const createOrganization = async (
  authContext: AuthContextType,
  newOrg: NewOrganizationDescription
): Promise<OrgDescription> => {
  const response = await postPrivateData(
    authContext,
    "api/user/create-org/",
    newOrg
  );
  return response?.data as OrgDescription;
};
