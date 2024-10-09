import {
  Box,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatFileSize } from "../../../../../utils/misc/textFormatting";
import { useContext, useEffect, useState, useCallback } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingIcon from "@mui/icons-material/Pending";
import { handleUploadFiles } from "../../../../../utils/ApiHandlers/DriveActionHandler";
import AuthContext from "../../../../../context/AuthContext";

interface UploadFileRowProps {
  file: File;
  triggerUpload: boolean;
  currentDirectoryID: string;
  onDelete: (file: File) => void;
}

const UploadFileRow = ({
  file,
  triggerUpload,
  currentDirectoryID,
  onDelete,
}: UploadFileRowProps) => {
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<
    "staging" | "uploading" | "success" | "failed"
  >("staging");

  const authContext = useContext(AuthContext);

  const handleUpload = useCallback(
    async (file: File): Promise<void> => {
      return handleUploadFiles(authContext, currentDirectoryID, file);
    },
    [authContext, currentDirectoryID]
  );

  useEffect(() => {
    if (triggerUpload) {
      setStatus("uploading");
      handleUpload(file)
        .then(() => {
          setStatus("success");
        })
        .catch((e) => {
          setStatus("failed");
          setError(e.response.data["error"]);
        });
    }
  }, [triggerUpload, file, handleUpload]);

  return (
    <TableRow key={file.name}>
      <TableCell>
        <Box display="flex" alignItems="center">
          <InsertDriveFileIcon sx={{ marginRight: 1 }} />
          <Typography>{file.name}</Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Typography>{formatFileSize(file.size)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{file.type}</Typography>
      </TableCell>
      <TableCell>
        {status === "staging" ? (
          <PendingIcon fontSize="large" color="warning" />
        ) : status === "uploading" ? (
          <CircularProgress />
        ) : status === "success" ? (
          <CheckIcon fontSize="large" color="success" />
        ) : status === "failed" ? (
          <Tooltip
            title={
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography align="center">Error</Typography>
                <Typography align="center">{error}</Typography>
                <Typography align="center">Click to retry</Typography>
              </Box>
            }
            placement="top"
          >
            <IconButton
              onClick={() => {
                setStatus("uploading");
                handleUpload(file)
                  .then(() => {
                    setStatus("success");
                  })
                  .catch((e) => {
                    setStatus("failed");
                    setError(e.response.data["error"]);
                  });
              }}
            >
              <ErrorIcon fontSize="large" color="error" />
            </IconButton>
          </Tooltip>
        ) : null}
      </TableCell>
      <TableCell>
        <IconButton
          onClick={() => onDelete(file)}
          disabled={status !== "staging"}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default UploadFileRow;
