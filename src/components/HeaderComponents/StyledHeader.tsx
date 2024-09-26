import { useContext } from "react";
import { AppBar, Box, Button, Typography } from "@mui/material";

import HeaderProfileMenuIcon from "./HeaderProfileMenuIcon";
import LoginButton from "./LoginButton";
import AuthContext from "../../context/AuthContext";
//import { useLocation, useNavigate } from "react-router-dom";

const StyledHeader = () => {
  const { user } = useContext(AuthContext);
  //const navigate = useNavigate();
  //const location = useLocation();

  return (
    <AppBar position="sticky">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Box padding={1}>
          {/* Left-aligned content */}
          <Typography variant="h6">Filamental</Typography>
        </Box>

        <Box>
          {/* Right-aligned content */}
          {user ? (
            <>
              <Button variant="contained" color="inherit">
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
