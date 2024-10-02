import { Fab, Typography, FabProps, Tooltip } from "@mui/material";
import { OrgDescription } from "../../../utils/datatypes/Organization";

interface OrgButtonProps {
  orgDescription: OrgDescription;
  fabProps: FabProps;
}

const OrgButton = ({ orgDescription, fabProps }: OrgButtonProps) => {
  return (
    <Tooltip title={orgDescription.org_name} placement="right" arrow>
      <Fab size="large" color="primary" aria-label="add" {...fabProps}>
        {orgDescription.org_icon_src ? (
          <img
            src={orgDescription.org_icon_src}
            alt="org"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography variant="h6">
            {orgDescription.org_name.slice(0, 3).toUpperCase()}
          </Typography>
        )}
      </Fab>
    </Tooltip>
  );
};

export default OrgButton;
