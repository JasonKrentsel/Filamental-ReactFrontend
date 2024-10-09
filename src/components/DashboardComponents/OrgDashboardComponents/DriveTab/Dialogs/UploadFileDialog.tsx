import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import UploadFileRow from "./UploadFileRow";
import { useState } from "react";
interface UploadFileDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentDirectoryID: string;
  onSubmit?: () => void;
}

const UploadFileDialog: React.FC<UploadFileDialogProps> = ({
  isOpen,
  setIsOpen,
  currentDirectoryID,
  onSubmit = () => {},
}) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [triggerUpload, setTriggerUpload] = useState<boolean>(false);

  const handleClose = () => {
    setIsOpen(false);
    setFileList([]);
    setTriggerUpload(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "50%",
          maxWidth: "none",
          maxHeight: "75%",
        },
      }}
    >
      <DialogTitle>Upload Files</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
          Select Files
          <input
            type="file"
            hidden
            onChange={(e) => setFileList(Array.from(e.target.files || []))}
            multiple
          />
        </Button>

        <Table
          stickyHeader
          sx={{ userSelect: "none", width: "100%", overflow: "scroll" }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileList &&
              Array.from(fileList).map((fileEntry) => (
                <UploadFileRow
                  key={fileEntry.name}
                  file={fileEntry}
                  currentDirectoryID={currentDirectoryID}
                  triggerUpload={triggerUpload}
                  onDelete={() => {
                    const newFileList = fileList.filter(
                      (f) => f.name !== fileEntry.name
                    );
                    setFileList(newFileList);
                  }}
                />
              ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        {triggerUpload ? (
          <Button
            onClick={() => {
              handleClose();
              onSubmit();
            }}
          >
            Finish
          </Button>
        ) : (
          <Button
            onClick={() => {
              setTriggerUpload(true);
            }}
          >
            Upload
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default UploadFileDialog;
