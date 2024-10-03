import { useState } from "react";
import { OrgDescription } from "../../../utils/ApiHandlers/OrganizationInfoHandler";
import { Tabs, Tab, Box } from "@mui/material";
import DriveTab from "./DriveTab/DriveTab";

interface OrgDashboardProps {
  currentOrg: OrgDescription;
}

const OrgDashboard = ({ currentOrg }: OrgDashboardProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <Tabs
        value={selectedTab}
        onChange={(_, newValue) => setSelectedTab(newValue)}
        centered
      >
        <Tab label="Drive" />
        <Tab label="Chat" />
        <Tab label="Organization" />
      </Tabs>
      <Box flexGrow={1} margin={1} borderRadius={2} overflow="hidden">
        <Box sx={{ display: selectedTab === 0 ? "block" : "none" }}>
          <DriveTab currentOrg={currentOrg} />
        </Box>
        <Box sx={{ display: selectedTab === 1 ? "block" : "none" }}>
          {/* Chat tab content */}
        </Box>
        <Box sx={{ display: selectedTab === 2 ? "block" : "none" }}>
          {/* Organization tab content */}
        </Box>
      </Box>
    </Box>
  );
};

export default OrgDashboard;
