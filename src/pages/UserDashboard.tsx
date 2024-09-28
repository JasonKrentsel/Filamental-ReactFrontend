import { Grid2, Paper, Stack, Typography } from "@mui/material";
import DirectoryManagerCell from "../components/DashboardComponents/DirectoryManagerCell";

const GRID_HEIGHT = "100%";
const BORDER_RADIUS = "16px";

const PAPER_STYLE = {
  paddingRight: 2,
  paddingLeft: 2,
  paddingTop: 2,
  paddingBottom: 6,
};

const UserDashboard = () => {
  return (
    <Grid2
      container
      spacing={3}
      sx={{ height: "100%", overflow: "hidden", padding: 3 }}
    >
      <Grid2 size={2}>
        <Paper sx={{ borderRadius: BORDER_RADIUS, ...PAPER_STYLE }}>
          <Stack height={GRID_HEIGHT}>
            <Typography variant="h6">Drive</Typography>
          </Stack>
        </Paper>
      </Grid2>
      <Grid2 size={10} sx={{ height: "100%" }}>
        <DirectoryManagerCell borderRadius={BORDER_RADIUS} />
      </Grid2>
    </Grid2>
  );
};

export default UserDashboard;
