import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import {
  OrgDashboardData,
  OrgDescription,
} from "../../../utils/datatypes/Organization";
import { getOrgDashboardDataByID } from "../../../utils/ApiHandlers/OrganizationInfoHandler";
import { Tabs, Tab, Box } from "@mui/material";

interface OrgDashboardProps {
  orgDescription: OrgDescription;
}

const OrgDashboard = ({ orgDescription }: OrgDashboardProps) => {
  const { accessToken } = useContext(AuthContext);
  const [orgDashboardData, setOrgDashboardData] =
    useState<OrgDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrgDashboardDataByID(orgDescription.org_id, accessToken).then((data) => {
      setOrgDashboardData(data);
      setIsLoading(false);
    });
  }, [orgDescription, accessToken]);

  if (isLoading || !orgDashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <Box height="100%" width="100%" display="flex" flexDirection="column">
      <Tabs>
        <Tab label="Drive" />
        <Tab label="Chat" />
        <Tab label="Organization" />
      </Tabs>
      <p>orgId: {orgDashboardData.org_id}</p>
      <p>orgName: {orgDashboardData.org_name}</p>
      <p>orgIconSrc: {orgDashboardData.org_icon_src}</p>
    </Box>
  );
};

export default OrgDashboard;
