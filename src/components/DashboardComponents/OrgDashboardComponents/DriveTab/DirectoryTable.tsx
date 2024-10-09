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

import { formatFileSize } from "../../../../utils/misc/textFormatting";
import CustomTableCell from "./CustomTableCell";
import {
  DirectoryContents,
  DirectoryDescription,
} from "../../../../utils/ApiHandlers/DriveActionHandler";
import { useState } from "react";
import ContextMenu from "./ContextMenu";

interface DirectoryTableProps {
  currentDirectoryContents: DirectoryContents | null;
  handleSelect: (
    type: "file" | "directory",
    id: string,
    event: React.MouseEvent,
    rightClick?: boolean
  ) => void;
  handleEnterDir: (directory_id: string) => void;
  selectedFiles: Set<string>;
  selectedDirectories: Set<string>;
}

const DirectoryTable = ({
  currentDirectoryContents,
  handleSelect,
  handleEnterDir,
  selectedFiles,
  selectedDirectories,
}: DirectoryTableProps) => {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleContextMenu = (
    type: "file" | "directory",
    id: string,
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    handleSelect(type, id, event, true);
    setContextMenu({ x: event.clientX, y: event.clientY });
  };
  return (
    <>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          selectedFilesIDs={selectedFiles}
          selectedDirectoriesIDs={selectedDirectories}
          handleCloseContextMenu={() => setContextMenu(null)}
        />
      )}
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
                  key={subdirectory.id}
                  onClick={(event) =>
                    handleSelect("directory", subdirectory.id, event)
                  }
                  onDoubleClick={() => {
                    console.log(subdirectory);
                    handleEnterDir(subdirectory.id);
                  }}
                  onContextMenu={(event) =>
                    handleContextMenu("directory", subdirectory.id, event)
                  }
                  sx={{
                    backgroundColor: selectedDirectories.has(subdirectory.id)
                      ? "#e0f7fa"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: selectedDirectories.has(subdirectory.id)
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
                key={file.id}
                onClick={(event) => handleSelect("file", file.id, event)}
                onContextMenu={(event) =>
                  handleContextMenu("file", file.id, event)
                }
                sx={{
                  backgroundColor: selectedFiles.has(file.id)
                    ? "#e0f7fa"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: selectedFiles.has(file.id)
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
    </>
  );
};

export default DirectoryTable;
