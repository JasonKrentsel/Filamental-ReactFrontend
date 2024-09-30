import { useEffect, useRef, useState } from "react";
import { Directory } from "../../../utils/FileStructure/Directory";
import { exampleRoot } from "../../../utils/FileStructure/Directory";
import { Breadcrumbs, Chip, Stack, Typography } from "@mui/material";
import DirectoryTable from "./DirectoryTable";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddActionFAB from "./AddActionFAB";
import UploadFileDialog from "./Dialogs/UploadFileDialog";
import NewFolderDialog from "./Dialogs/NewFolderDialog";

const DirectoryManagerCell = () => {
  const [currentDirectory, setCurrentDirectory] =
    useState<Directory>(exampleRoot);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);
  const [directoryStack, setDirectoryStack] = useState<Directory[]>([
    currentDirectory,
  ]);

  const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);
  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);

  const handleSelect = (name: string, event: React.MouseEvent) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.ctrlKey || event.shiftKey) {
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
      <AddActionFAB
        onUploadFileDialog={() => setOpenUploadFileDialog(true)}
        onNewFolderDialog={() => setOpenNewFolderDialog(true)}
      />
      <UploadFileDialog
        isOpen={openUploadFileDialog}
        setIsOpen={setOpenUploadFileDialog}
        onSubmit={() => {
          // TODO: handleUploadFiles
          setOpenUploadFileDialog(false);
        }}
      />
      <NewFolderDialog
        isOpen={openNewFolderDialog}
        setIsOpen={setOpenNewFolderDialog}
        onSubmit={() => {
          // TODO: handleNewDirectory
          setOpenNewFolderDialog(false);
        }}
      />
    </Stack>
  );
};

export default DirectoryManagerCell;
