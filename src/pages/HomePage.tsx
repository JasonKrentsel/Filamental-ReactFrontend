import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Filamental</h1>
        <p>Your smart drive service</p>
        <p>Homepage under construction</p>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default HomePage;
