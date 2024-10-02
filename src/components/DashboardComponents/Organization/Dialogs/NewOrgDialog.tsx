import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { NewOrganizationDescription } from "../../../../utils/datatypes/Organization";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface NewOrgDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmitOrg: (newOrgDescription: NewOrganizationDescription) => Promise<void>;
}

const NewOrgDialog: React.FC<NewOrgDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmitOrg,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
          setIsLoading(true);
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          const organization_name = formData.get("organization_name");
          onSubmitOrg({
            new_org_name: organization_name as string,
          } as NewOrganizationDescription).then(() => {
            setIsLoading(false);
            setIsOpen(false);
          });
        },
      }}
    >
      <DialogTitle>New Organization</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: 2 }}>
          <TextField
            label="Organization Name"
            name="organization_name"
            required
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="outlined" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <LoadingButton variant="contained" loading={isLoading} type="submit">
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewOrgDialog;
