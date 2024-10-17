import { useState } from "react";
import { OrgDescription } from "../../../utils/ApiHandlers/OrganizationInfoHandler";
import { Tabs, Tab, Box } from "@mui/material";
import DriveTab from "./DriveTab/DriveTab";
import ChatTab from "./ChatTab/ChatTab";

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
        sx={{
          height: "5%",
          maxHeight: "5%",
        }}
      >
        <Tab label="Drive" />
        <Tab label="Chat" />
        <Tab label="Organization" />
      </Tabs>
      <Box height="95%" maxHeight="95%">
        <div
          style={{
            display: selectedTab === 0 ? "flex" : "none",
            height: "100%",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <DriveTab currentOrg={currentOrg} />
        </div>
        <div
          style={{
            display: selectedTab === 1 ? "flex" : "none",
            height: "100%",
            width: "100%",
          }}
        >
          <ChatTab currentOrg={currentOrg} />
        </div>
        <div
          style={{
            display: selectedTab === 2 ? "flex" : "none",
            height: "100%",
            width: "100%",
          }}
        >
          {/* Organization tab content */}
        </div>
      </Box>
    </Box>
  );
};

export default OrgDashboard;
