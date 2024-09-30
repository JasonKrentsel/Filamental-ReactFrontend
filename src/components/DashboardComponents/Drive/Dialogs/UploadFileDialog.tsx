import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";

interface UploadFileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSubmit: (files: FileList) => void;
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const [fileList, setFileList] = useState<FileList | null>(null);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (fileList) {
            onSubmit(fileList);
          }
          setFileList(null);
          setIsOpen(false);
        },
      }}
    >
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        <input
          type="file"
          multiple
          onChange={(e) => setFileList(e.target.files)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit">Upload</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;
