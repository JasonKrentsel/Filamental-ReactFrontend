import {
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useRef } from "react";

type ContextMenuProps = {
  x: number;
  y: number;
  selectedFilesIDs: Set<string>;
  selectedDirectoriesIDs: Set<string>;
  handleCloseContextMenu: () => void;
};

const ContextMenu = ({
  x,
  y,
  selectedFilesIDs,
  selectedDirectoriesIDs,
  handleCloseContextMenu,
}: ContextMenuProps) => {
  const paperRef = useRef<HTMLDivElement | null>(null);
  const totalSelected = selectedFilesIDs.size + selectedDirectoriesIDs.size;

  const handlePreview = (file_id: string) => {
    console.log("Preview", file_id);
  };

  const handleRename = (item_id: string, item_type: "file" | "directory") => {
    console.log("Rename", item_id, item_type);
  };

  const handleDelete = (
    deleteFilesIDs: string[],
    deleteDirectoriesIDs: string[]
  ) => {
    console.log("Delete Files", deleteFilesIDs);
    console.log("Delete Directories", deleteDirectoriesIDs);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        paperRef.current &&
        !paperRef.current.contains(event.target as Node)
      ) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleCloseContextMenu]);

  return (
    <Paper
      ref={paperRef}
      sx={{ position: "absolute", zIndex: 1000, left: x, top: y }}
      onClick={(event) => event.stopPropagation()}
    >
      <MenuList>
        <Typography sx={{ padding: "8px 16px" }}>
          {totalSelected + " items selected"}
        </Typography>
        <Divider />

        <MenuItem
          disabled={
            selectedFilesIDs.size != 1 || selectedDirectoriesIDs.size != 0
          }
          onClick={() => {
            handlePreview(Array.from(selectedFilesIDs)[0]);
            handleCloseContextMenu();
          }}
        >
          <ListItemText primary="Preview" />
        </MenuItem>

        <MenuItem
          disabled={totalSelected != 1}
          onClick={() => {
            const selectedItem =
              Array.from(selectedFilesIDs)[0] ||
              Array.from(selectedDirectoriesIDs)[0];
            const itemType = selectedFilesIDs.has(selectedItem)
              ? "file"
              : "directory";

            handleRename(selectedItem, itemType);
            handleCloseContextMenu();
          }}
        >
          <ListItemText primary="Rename" />
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleDelete(
              Array.from(selectedFilesIDs),
              Array.from(selectedDirectoriesIDs)
            );
            handleCloseContextMenu();
          }}
        >
          <ListItemText
            primary={totalSelected > 1 ? "Delete items" : "Delete item"}
          />
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default ContextMenu;
