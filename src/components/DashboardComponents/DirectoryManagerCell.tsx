import { useEffect, useRef, useState } from "react";
import { Directory } from "../../utils/FileStructure/Directory";
import { exampleRoot } from "../../utils/FileStructure/Directory";
import { Breadcrumbs, Chip, Fab, Stack, Typography } from "@mui/material";
import DirectoryTable from "./DirectoryTable";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";

const DirectoryManagerCell = () => {
  const [currentDirectory, setCurrentDirectory] =
    useState<Directory>(exampleRoot);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);
  const [directoryStack, setDirectoryStack] = useState<Directory[]>([
    currentDirectory,
  ]);

  const handleSelect = (name: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event from bubbling up to document
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.ctrlKey) {
        // Ctrl-click: add/remove item from selection
        if (newSelected.has(name)) {
          newSelected.delete(name);
        } else {
          newSelected.add(name);
        }
      } else {
        // Regular click: clear selection and select only the clicked item
        newSelected.clear();
        newSelected.add(name);
      }
      return newSelected;
    });
  };

  const handleEnterDir = (subdirectory: Directory) => {
    setDirectoryStack([...directoryStack, subdirectory]);
    setCurrentDirectory(subdirectory);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableRef.current &&
        !tableRef.current.contains(event.target as Node)
      ) {
        setSelectedItems(new Set());
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Stack
      ref={tableRef}
      spacing={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      {/* Breadcrumb */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
        {directoryStack.map((dir, index) => (
          <Chip
            key={dir.name}
            label={
              <Typography variant="h6" color="text.secondary">
                {dir.name}
              </Typography>
            }
            sx={{
              padding: 1,
            }}
            onClick={() => {
              // remove all directories after the current index
              setDirectoryStack(directoryStack.slice(0, index + 1));
              setCurrentDirectory(directoryStack[index]);
            }}
          />
        ))}
      </Breadcrumbs>
      <DirectoryTable
        currentDirectory={currentDirectory}
        handleSelect={handleSelect}
        handleEnterDir={handleEnterDir}
        selectedItems={selectedItems}
      />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "absolute", bottom: 0, right: 0 }}
      >
        <AddIcon />
      </Fab>
    </Stack>
  );
};

export default DirectoryManagerCell;
