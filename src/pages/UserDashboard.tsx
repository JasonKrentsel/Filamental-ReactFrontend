import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { OrgDescription } from "../utils/datatypes/Organization";
import DashboardPageSelectSide from "../components/DashboardComponents/Organization/DashboardPageSelectSide";

const UserDashboard = () => {
  const [selectedOrg, setSelectedOrg] = useState<OrgDescription | null>(null);

  return (
    <Stack direction="row" height="100%" sx={{ overflow: "hidden" }}>
      <DashboardPageSelectSide
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
      />
      <Box flexGrow={1} bgcolor="green">
        {selectedOrg ? selectedOrg.org_name : <div>Home</div>}
      </Box>
    </Stack>
  );
};

export default UserDashboard;
