import {
  Fab,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  ClickAwayListener,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from "@mui/icons-material/Folder";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useState } from "react";

interface AddActionFABProps {
  onUploadFileDialog: () => void;
  onNewFolderDialog: () => void;
}

const AddActionFAB: React.FC<AddActionFABProps> = ({
  onUploadFileDialog,
  onNewFolderDialog,
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const getFab = (open: boolean) => {
    return open ? (
      <Fab color="secondary" aria-label="add" onClick={handleClick}>
        <ArrowUpwardIcon />
      </Fab>
    ) : (
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    );
  };

  return (
    <div style={{ position: "absolute", bottom: "3%", right: "3%" }}>
      {getFab(open)}
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        placement="top-start"
        transition
        disablePortal
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: "bottom",
            }}
          >
            <Paper sx={{ marginBottom: 1, padding: 0 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList sx={{ margin: 0, padding: 0 }}>
                  <MenuItem
                    onClick={() => {
                      onUploadFileDialog();
                      handleClose();
                    }}
                  >
                    <Stack
                      gap={2}
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <InsertDriveFileIcon /> Upload Files
                    </Stack>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      onNewFolderDialog();
                      handleClose();
                    }}
                  >
                    <Stack
                      gap={2}
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <FolderIcon /> New Folder
                    </Stack>
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default AddActionFAB;
