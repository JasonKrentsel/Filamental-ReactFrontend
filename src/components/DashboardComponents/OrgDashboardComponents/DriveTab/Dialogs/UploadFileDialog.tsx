import { LoadingButton } from "@mui/lab";
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
  onSubmit: (files: FileList) => Promise<void>;
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  isOpen,
  setIsOpen,
  onSubmit,
}) => {
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      PaperProps={{
        component: "form",
        onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (!fileList) {
            return;
          }
          setIsLoading(true);
          onSubmit(fileList)
            .then(() => {
              setFileList(null);
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
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent>
        <input
          type="file"
          multiple
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFileList(e.target.files);
            }
          }}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <LoadingButton
          variant="contained"
          loading={isLoading}
          type="submit"
          disabled={!fileList}
        >
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;
