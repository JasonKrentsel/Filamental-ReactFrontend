import { Directory } from "../../utils/FileStructure/Directory";
import {
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
interface DirectoryTableProps {
  currentDirectory: Directory;
  handleSelect: (name: string, event: React.MouseEvent) => void;
  handleEnterDir: (subdirectory: Directory) => void;
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
  currentDirectory,
  handleSelect,
  handleEnterDir,
  selectedItems,
}: DirectoryTableProps) => {
  return (
    <TableContainer
      sx={{ borderRadius: "16px", overflow: "scroll", height: "100%" }}
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
          {currentDirectory.subdirectories.map((subdirectory) => (
            <TableRow
              key={subdirectory.name}
              onClick={(event) => handleSelect(subdirectory.name, event)}
              onDoubleClick={() => handleEnterDir(subdirectory)}
              sx={{
                backgroundColor: selectedItems.has(subdirectory.name)
                  ? "#e0f7fa"
                  : "transparent",
                "&:hover": {
                  backgroundColor: selectedItems.has(subdirectory.name)
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
                {subdirectory.created_at.toLocaleDateString()}
              </CustomTableCell>
              {/* file size */}
              <CustomTableCell>
                <FilePresentIcon />
                {subdirectory.files.length +
                  subdirectory.subdirectories.length}{" "}
                {subdirectory.files.length +
                  subdirectory.subdirectories.length ===
                1
                  ? "Item"
                  : "Items"}
              </CustomTableCell>
            </TableRow>
          ))}

          {/* files */}
          {currentDirectory.files.map((file) => (
            <TableRow
              key={file.name}
              onClick={(event) => handleSelect(file.name, event)}
              sx={{
                backgroundColor: selectedItems.has(file.name)
                  ? "#e0f7fa"
                  : "transparent",
                "&:hover": {
                  backgroundColor: selectedItems.has(file.name)
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
                {file.created_at.toLocaleDateString()}
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
    </TableContainer>
  );
};

export default DirectoryTable;
