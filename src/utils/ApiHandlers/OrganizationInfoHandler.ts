import { OrgDescription } from "../datatypes/Organization";
import { getPrivateData } from "./PrivateAPIHandler";

// const orgs: OrgDescription[] = [
//   {
//     org_name: "Org 1",
//     org_icon_src:
//       "https://onlinepngtools.com/images/examples-onlinepngtools/man-on-the-mountain-edge-avatar.png",
//     org_id: "1",
//   },
//   {
//     org_name: "Org 2",
//     org_icon_src: "",
//     org_id: "2",
//   },
// ];

export const getUserOrgDescriptions = async (
  accessToken: string
): Promise<OrgDescription[]> => {
  const response = await getPrivateData(
    "api/user/org-descriptions/",
    accessToken
  );
  console.log(response.data);
  return (response.data as OrgDescription[]) || [];
};
