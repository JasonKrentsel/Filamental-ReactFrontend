import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FilePresentIcon from "@mui/icons-material/FilePresent";

import CustomTableCell from "./CustomTableCell";
import {
  DirectoryContents,
  DirectoryDescription,
} from "../../../../utils/ApiHandlers/DriveActionHandler";

interface DirectoryTableProps {
  currentDirectoryContents: DirectoryContents | null;
  handleSelect: (name: string, event: React.MouseEvent) => void;
  handleEnterDir: (directory_id: string) => void;
  selectedItems: Set<string>;
}

// Utility function to format file size
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

const DirectoryTable = ({
  currentDirectoryContents,
  handleSelect,
  handleEnterDir,
  selectedItems,
}: DirectoryTableProps) => {
  return (
    <TableContainer
      sx={{
        borderRadius: "16px",
        overflow: "scroll",
        "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar for WebKit browsers
        "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
        "scrollbar-width": "none", // Hide scrollbar for Firefox
      }}
    >
      <Table stickyHeader sx={{ userSelect: "none" }}>
        {/* table header */}
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>File Size</TableCell>
          </TableRow>
        </TableHead>

        {/* table body */}
        <TableBody>
          {/* subdirectories */}
          {currentDirectoryContents?.sub_directories.map(
            (subdirectory: DirectoryDescription) => (
              <TableRow
                key={subdirectory.directory_id}
                onClick={(event) =>
                  handleSelect(subdirectory.directory_id, event)
                }
                onDoubleClick={() => handleEnterDir(subdirectory.directory_id)}
                sx={{
                  backgroundColor: selectedItems.has(subdirectory.directory_id)
                    ? "#e0f7fa"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: selectedItems.has(
                      subdirectory.directory_id
                    )
                      ? "#e0f7fa" // Keep selection color on hover if selected
                      : "#f5f5f5", // Slightly greyer on hover if not selected
                  },
                }}
              >
                {/* name */}
                <CustomTableCell>
                  <FolderIcon />
                  {subdirectory.name}
                </CustomTableCell>
                {/* created by */}
                <CustomTableCell>
                  <PersonIcon />
                  {subdirectory.created_by}
                </CustomTableCell>
                {/* created at */}
                <CustomTableCell>
                  <CalendarMonthIcon />
                  {subdirectory.created_at}
                </CustomTableCell>
                {/* file size */}
                <CustomTableCell>-</CustomTableCell>
              </TableRow>
            )
          )}

          {/* files */}
          {currentDirectoryContents?.files.map((file) => (
            <TableRow
              key={file.file_id}
              onClick={(event) => handleSelect(file.file_id, event)}
              sx={{
                backgroundColor: selectedItems.has(file.file_id)
                  ? "#e0f7fa"
                  : "transparent",
                "&:hover": {
                  backgroundColor: selectedItems.has(file.file_id)
                    ? "#e0f7fa" // Keep selection color on hover if selected
                    : "#f5f5f5", // Slightly greyer on hover if not selected
                },
              }}
            >
              <CustomTableCell>
                <InsertDriveFileIcon />
                {file.name}
              </CustomTableCell>
              {/* created by */}
              <CustomTableCell>
                <PersonIcon />
                {file.created_by}
              </CustomTableCell>
              {/* created at */}
              <CustomTableCell>
                <CalendarMonthIcon />
                {file.created_at}
              </CustomTableCell>
              {/* file size */}
              <CustomTableCell>
                <FilePresentIcon />
                {formatFileSize(file.file_size)}
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Divider sx={{ width: "100%", borderBottomWidth: 2 }} />
    </TableContainer>
  );
};

export default DirectoryTable;
