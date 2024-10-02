import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { OrgDescription } from "../utils/datatypes/Organization";
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
          <OrgDashboard key={selectedOrg.org_id} orgDescription={selectedOrg} />
        ) : (
          <HomeDashboard />
        )}
      </Box>
    </Stack>
  );
};

export default UserDashboard;
