import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const LoginButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      onClick={() => {
        navigate("/login", { state: { from: location } });
      }}
      variant="text"
      color="inherit"
    >
      Login
    </Button>
  );
};

export default LoginButton;
