import { Typography } from "@mui/material";
import DirectoryTable from "../components/DashboardComponents/DirectoryTable";
import { exampleRoot } from "../utils/FileStructure/Directory";

const UserDashboard = () => {
  return (
    <div>
      <Typography variant="h1">User Dashboard</Typography>
      <DirectoryTable directory={exampleRoot} />
    </div>
  );
};

export default UserDashboard;
