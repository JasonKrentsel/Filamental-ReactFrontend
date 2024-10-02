import {
  OrgDescription,
  NewOrganizationDescription,
  OrgDashboardData,
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

const sampleOrgDashboardData: OrgDashboardData = {
  org_id: "1",
  org_name: "Sample Org",
  org_icon_src: "",
};

export const getOrgDashboardDataByID = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _orgId: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _accessToken: string
): Promise<OrgDashboardData> => {
  // Simulate API call with a 1-second delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return sampleOrgDashboardData;
};
