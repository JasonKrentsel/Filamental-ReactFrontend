import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { OrgDescription } from "../utils/ApiHandlers/OrganizationInfoHandler";
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebarComponents/DashboardSidebar";
import OrgDashboard from "../components/DashboardComponents/OrgDashboardComponents/OrgDashboard";
import HomeDashboard from "../components/DashboardComponents/HomeDashboardComponents/HomeDashboard";

const UserDashboard = () => {
  const [selectedOrg, setSelectedOrg] = useState<OrgDescription | null>(null);

  return (
    <Stack direction="row" height="100%" sx={{ overflow: "hidden" }}>
      <Box width={75} flexShrink={0}>
        <DashboardSidebar
          selectedOrg={selectedOrg}
          setSelectedOrg={setSelectedOrg}
        />
      </Box>
      <Box flexGrow={1}>
        {selectedOrg ? (
          // key required so that OrgDashboard properly reloads on selectedOrg change
          <OrgDashboard key={selectedOrg.org_id} currentOrg={selectedOrg} />
        ) : (
          <HomeDashboard />
        )}
      </Box>
    </Stack>
  );
};

export default UserDashboard;
