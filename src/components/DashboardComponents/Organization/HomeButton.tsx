import { Fab, FabProps, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const HomeButton = (fabProps: FabProps) => {
  return (
    <Tooltip title="Home" placement="right" arrow>
      <Fab size="large" color="primary" aria-label="add" {...fabProps}>
        <HomeIcon />
      </Fab>
    </Tooltip>
  );
};

export default HomeButton;
