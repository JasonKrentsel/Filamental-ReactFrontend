import { Fab, FabProps, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NewOrgButton = (fabProps: FabProps) => {
  return (
    <Tooltip title="Create New Organization" placement="right" arrow>
      <Fab size="large" color="primary" aria-label="add" {...fabProps}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default NewOrgButton;
