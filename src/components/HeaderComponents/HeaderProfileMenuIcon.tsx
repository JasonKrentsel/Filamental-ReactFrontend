import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRef, useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";

const HeaderProfileMenuIcon = () => {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // TODO: Implement MUI avatar over the account circle icon
  return (
    <>
      {/* Profile menu icon with dropdown */}
      <IconButton
        ref={anchorRef}
        id="profile-button"
        aria-controls={open ? "profile-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="inherit"
      >
        <AccountCircleIcon fontSize="large" />
      </IconButton>

      {/* Dropdown menu */}
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem disabled onClick={handleClose}>
                    My Account
                  </MenuItem>
                  <MenuItem disabled onClick={handleClose}>
                    My Organization
                  </MenuItem>
                  <MenuItem disabled onClick={handleClose}>
                    Billing
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default HeaderProfileMenuIcon;
