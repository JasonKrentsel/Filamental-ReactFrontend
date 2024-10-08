import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface NewFolderDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (newFolderName: string) => Promise<void>;
}

const NewFolderDialog: React.FC<NewFolderDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // TODO: add validation for folder name
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
          setIsLoading(true);
          e.preventDefault();
          onSubmit(folderName)
            .then(() => {
              setFolderName("");
              setIsLoading(false);
              setIsOpen(false);
            })
            .catch((error) => {
              console.error(error);
              setIsLoading(false);
            });
        },
      }}
    >
      <DialogTitle>New Folder</DialogTitle>
      <DialogContent>
        <Box sx={{ padding: 2 }}>
          <TextField
            label="Folder Name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            required
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          type="submit"
          disabled={!folderName}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default NewFolderDialog;
