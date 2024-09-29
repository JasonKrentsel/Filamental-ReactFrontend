import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { Button, Paper, Stack, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const state = useLocation().state as { from?: Location };
  const navigate = useNavigate();

  return (
    <Stack
      direction="column"
      paddingTop={15}
      alignItems="center"
      spacing={5}
      sx={{
        width: "100%",
      }}
    >
      <Paper
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <form
          onSubmit={(e) => {
            login(e).then(() => {
              navigate(state?.from || "/");
            });
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">Login</Typography>
            <TextField
              variant="outlined"
              name="username"
              placeholder="Enter Username"
            />
            <TextField
              variant="outlined"
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </form>
      </Paper>

      <Paper
        sx={{
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
          paddingRight: 5,
        }}
      >
        <Stack spacing={1} alignItems="center">
          <Typography variant="body1">Don't have an account?</Typography>
          <Link to="/register">Register Here</Link>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default LoginPage;
