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
import { useState, useRef, MouseEvent } from "react";
import ContextMenu from "./ContextMenu";

interface DirectoryTableProps {
  currentDirectoryContents: DirectoryContents | null;
  handleSelect: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent,
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

  const isMouseDown = useRef<boolean>(false);
  const selectedItems = useRef<Set<string>>(new Set());

  // Event Handlers
  const handlePointerDown = createPointerDownHandler(
    isMouseDown,
    selectedItems,
    handleSelect
  );

  const handleMouseUp = createMouseUpHandler(isMouseDown, selectedItems);

  const handleMouseOver = createMouseOverHandler(
    isMouseDown,
    selectedItems,
    handleSelect
  );

  const handleContextMenu = createContextMenuHandler(
    selectedFiles,
    selectedDirectories,
    handleSelect,
    setContextMenu
  );

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
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }}
        onPointerUp={handleMouseUp}
      >
        <Table stickyHeader sx={{ userSelect: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>File Size</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderSubdirectories(
              currentDirectoryContents,
              handlePointerDown,
              handleEnterDir,
              handleContextMenu,
              handleMouseOver,
              selectedDirectories
            )}
            {renderFiles(
              currentDirectoryContents,
              handlePointerDown,
              handleContextMenu,
              handleMouseOver,
              selectedFiles
            )}
          </TableBody>
        </Table>
        <Divider sx={{ width: "100%", borderBottomWidth: 2 }} />
      </TableContainer>
    </>
  );
};

// Helper Functions
function createPointerDownHandler(
  isMouseDown: React.MutableRefObject<boolean>,
  selectedItems: React.MutableRefObject<Set<string>>,
  handleSelect: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void
) {
  return (type: "file" | "directory", id: string, event: MouseEvent) => {
    if (event.button === 0) {
      isMouseDown.current = true;
      selectedItems.current.add(id);
      handleSelect(type, id, event);
    }
  };
}

function createMouseUpHandler(
  isMouseDown: React.MutableRefObject<boolean>,
  selectedItems: React.MutableRefObject<Set<string>>
) {
  return () => {
    isMouseDown.current = false;
    selectedItems.current.clear();
  };
}

function createMouseOverHandler(
  isMouseDown: React.MutableRefObject<boolean>,
  selectedItems: React.MutableRefObject<Set<string>>,
  handleSelect: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void
) {
  return (type: "file" | "directory", id: string, event: MouseEvent) => {
    if (isMouseDown.current && !selectedItems.current.has(id)) {
      selectedItems.current.add(id);
      const modifiedEvent = { ...event, ctrlKey: true };
      handleSelect(type, id, modifiedEvent);
    }
  };
}

function createContextMenuHandler(
  selectedFiles: Set<string>,
  selectedDirectories: Set<string>,
  handleSelect: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void,
  setContextMenu: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >
) {
  return (type: "file" | "directory", id: string, event: MouseEvent) => {
    event.preventDefault();
    const isSelected =
      type === "file" ? selectedFiles.has(id) : selectedDirectories.has(id);

    if (!isSelected) {
      handleSelect(type, id, event);
    }

    setContextMenu({ x: event.clientX, y: event.clientY });
  };
}

function renderSubdirectories(
  currentDirectoryContents: DirectoryContents | null,
  handlePointerDown: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void,
  handleEnterDir: (directory_id: string) => void,
  handleContextMenu: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void,
  handleMouseOver: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void,
  selectedDirectories: Set<string>
) {
  return currentDirectoryContents?.sub_directories.map(
    (subdirectory: DirectoryDescription) => (
      <TableRow
        key={subdirectory.id}
        onPointerDown={(event) =>
          handlePointerDown("directory", subdirectory.id, event)
        }
        onDoubleClick={() => handleEnterDir(subdirectory.id)}
        onContextMenu={(event) =>
          handleContextMenu("directory", subdirectory.id, event)
        }
        onMouseOver={(event) =>
          handleMouseOver("directory", subdirectory.id, event)
        }
        sx={{
          backgroundColor: selectedDirectories.has(subdirectory.id)
            ? "#e0f7fa"
            : "transparent",
          "&:hover": {
            backgroundColor: selectedDirectories.has(subdirectory.id)
              ? "#e0f7fa"
              : "#f5f5f5",
          },
        }}
      >
        <CustomTableCell>
          <FolderIcon />
          {subdirectory.name}
        </CustomTableCell>
        <CustomTableCell>
          <PersonIcon />
          {subdirectory.created_by}
        </CustomTableCell>
        <CustomTableCell>
          <CalendarMonthIcon />
          {subdirectory.created_at}
        </CustomTableCell>
        <CustomTableCell>-</CustomTableCell>
      </TableRow>
    )
  );
}

function renderFiles(
  currentDirectoryContents: DirectoryContents | null,
  handlePointerDown: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void,
  handleContextMenu: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void,
  handleMouseOver: (
    type: "file" | "directory",
    id: string,
    event: MouseEvent
  ) => void,
  selectedFiles: Set<string>
) {
  return currentDirectoryContents?.files.map((file) => (
    <TableRow
      key={file.id}
      onPointerDown={(event) => handlePointerDown("file", file.id, event)}
      onContextMenu={(event) => handleContextMenu("file", file.id, event)}
      onMouseOver={(event) => handleMouseOver("file", file.id, event)}
      sx={{
        backgroundColor: selectedFiles.has(file.id) ? "#e0f7fa" : "transparent",
        "&:hover": {
          backgroundColor: selectedFiles.has(file.id) ? "#e0f7fa" : "#f5f5f5",
        },
      }}
    >
      <CustomTableCell>
        <InsertDriveFileIcon />
        {file.name}
      </CustomTableCell>
      <CustomTableCell>
        <PersonIcon />
        {file.created_by}
      </CustomTableCell>
      <CustomTableCell>
        <CalendarMonthIcon />
        {file.created_at}
      </CustomTableCell>
      <CustomTableCell>
        <FilePresentIcon />
        {formatFileSize(file.file_size)}
      </CustomTableCell>
    </TableRow>
  ));
}

export default DirectoryTable;
