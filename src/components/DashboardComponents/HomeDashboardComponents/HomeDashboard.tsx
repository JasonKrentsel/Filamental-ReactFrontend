import { Stack, Typography } from "@mui/material";

const HomeDashboard = () => {
  return (
    <Stack justifyContent="center" alignItems="center" height="100%">
      <Typography variant="h1">Welcome to the Home Dashboard</Typography>
      <Typography variant="body1">
        Not much here yet, but it's where you'll be able to manage your account
        and organizations.
      </Typography>
    </Stack>
  );
};

export default HomeDashboard;
