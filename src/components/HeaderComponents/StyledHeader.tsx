import { useContext } from "react";
import { AppBar, Box, Button, Tooltip, Typography } from "@mui/material";
import LogoDevIcon from "@mui/icons-material/LogoDev";

import HeaderProfileMenuIcon from "./HeaderProfileMenuIcon";
import LoginButton from "./LoginButton";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StyledHeader = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <AppBar position="sticky">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Tooltip arrow title="Return to Homepage">
          <Box
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
            padding={1}
            display="flex"
            alignItems="center"
            gap={1}
          >
            {/* Left-aligned content */}
            <LogoDevIcon fontSize="large" />
            <Typography variant="h6">Filamental</Typography>
          </Box>
        </Tooltip>

        <Box>
          {/* Right-aligned content */}
          {isLoggedIn ? (
            <>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
              <HeaderProfileMenuIcon />
            </>
          ) : (
            <LoginButton />
          )}
        </Box>
      </Box>
    </AppBar>
  );
};

export default StyledHeader;
