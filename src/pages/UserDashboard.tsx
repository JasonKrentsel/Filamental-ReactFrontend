import { Box, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { OrgDescription } from "../utils/datatypes/Organization";
import DashboardPageSelectSide from "../components/DashboardComponents/Organization/DashboardPageSelectSide";
import { getUserOrgDescriptions } from "../utils/ApiHandlers/OrganizationInfoHandler";

const UserDashboard = () => {
  const [userOrgs, setUserOrgs] = useState<OrgDescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState<OrgDescription | null>(null);

  useEffect(() => {
    const fetchUserOrgs = async () => {
      const orgs = await getUserOrgDescriptions();
      setUserOrgs(orgs);
      setIsLoading(false);
    };
    fetchUserOrgs();
  }, []);

  return (
    <Stack direction="row" height="100%" sx={{ overflow: "hidden" }}>
      <DashboardPageSelectSide
        userOrgs={userOrgs}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        isLoading={isLoading}
      />
      <Box flexGrow={1} bgcolor="green">
        {selectedOrg ? selectedOrg.org_name : <div>Home</div>}
      </Box>
    </Stack>
  );
};

export default UserDashboard;
