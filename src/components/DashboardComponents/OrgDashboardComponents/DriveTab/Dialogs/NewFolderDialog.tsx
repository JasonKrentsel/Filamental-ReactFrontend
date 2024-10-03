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

interface NewFolderDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (newFolderName: string) => void;
}

const NewFolderDialog: React.FC<NewFolderDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const [folderName, setFolderName] = useState("");

  // TODO: add validation for folder name
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          onSubmit(folderName);
          setFolderName("");
          setIsOpen(false);
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
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewFolderDialog;
