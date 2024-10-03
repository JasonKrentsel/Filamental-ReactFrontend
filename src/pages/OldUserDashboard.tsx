import { Divider, Grid2, Paper, Stack, Typography } from "@mui/material";
import DriveTab from "../components/DashboardComponents/OrgDashboardComponents/DriveTab/DriveTab";

const GRID_HEIGHT = "100%";
const BORDER_RADIUS = "16px";

const PAPER_STYLE = {
  paddingRight: 2,
  paddingLeft: 2,
  paddingTop: 2,
  paddingBottom: 2,
};

const OldUserDashboard = () => {
  return (
    <Grid2
      container
      spacing={3}
      sx={{ height: "100%", overflow: "scroll", padding: 3 }}
    >
      <Grid2 size={2} sx={{ height: "100%" }}>
        <Paper sx={{ borderRadius: BORDER_RADIUS, ...PAPER_STYLE }}>
          <Stack height={GRID_HEIGHT}>
            <Typography variant="h6">Drive</Typography>
            <Divider />
            <Typography variant="h6">Chat</Typography>
            <Divider />
            <Typography variant="h6">Organization</Typography>
          </Stack>
        </Paper>
      </Grid2>
      <Grid2 size={10} sx={{ height: "100%", display: "flex" }}>
        <Paper
          sx={{
            flexGrow: 1,
            borderRadius: BORDER_RADIUS,
            ...PAPER_STYLE,
          }}
        >
          <DriveTab />
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default OldUserDashboard;
