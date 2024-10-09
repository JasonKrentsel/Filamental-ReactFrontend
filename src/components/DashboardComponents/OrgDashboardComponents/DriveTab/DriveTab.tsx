import { useContext, useEffect, useRef, useState } from "react";
import { Breadcrumbs, Chip, Stack, Typography, Box } from "@mui/material";
import DirectoryTable from "./DirectoryTable";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddActionFAB from "./AddActionFAB";
import UploadFileDialog from "./Dialogs/UploadFileDialog";
import NewFolderDialog from "./Dialogs/NewFolderDialog";
import AuthContext from "../../../../context/AuthContext";
import { OrgDescription } from "../../../../utils/ApiHandlers/OrganizationInfoHandler";
import {
  DirectoryContents,
  getDirectoryContentsByID,
  handleNewDirectory,
} from "../../../../utils/ApiHandlers/DriveActionHandler";

interface DriveTabProps {
  currentOrg: OrgDescription;
}

const DriveTab = ({ currentOrg }: DriveTabProps) => {
  const [currentDirectory, setCurrentDirectory] = useState<DirectoryContents>({
    directory_id: currentOrg.org_root_directory_id,
    name: "Loading...",
    files: [],
    sub_directories: [],
  });

  const [directoryStack, setDirectoryStack] = useState<
    {
      directory_id: string;
      name: string;
    }[]
  >([currentDirectory]);

  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const tableRef = useRef<HTMLDivElement>(null);

  const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);
  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);

  const { accessToken, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleSelect = (id: string, event: React.MouseEvent) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (event.ctrlKey || event.shiftKey) {
        // Ctrl-click: add/remove item from selection
        if (newSelected.has(id)) {
          newSelected.delete(id);
        } else {
          newSelected.add(id);
        }
      } else {
        // Regular click: clear selection and select only the clicked item
        newSelected.clear();
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const setCurrentDirectoryByID = (directory_id: string) => {
    getDirectoryContentsByID(accessToken, directory_id, logout).then(
      (newDirectory: DirectoryContents) => {
        setCurrentDirectory(newDirectory);
      }
    );
  };

  const handleEnterDir = (directory_id: string) => {
    setIsLoading(true);
    getDirectoryContentsByID(accessToken, directory_id, logout).then(
      (newDirectory: DirectoryContents) => {
        setDirectoryStack([...directoryStack, newDirectory]);
        setCurrentDirectoryByID(directory_id);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getDirectoryContentsByID(
      accessToken,
      currentOrg.org_root_directory_id,
      logout
    ).then((newDirectory: DirectoryContents) => {
      setCurrentDirectory(newDirectory);
      setDirectoryStack([newDirectory]);
      setIsLoading(false);
    });

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
  }, [accessToken, currentOrg.org_root_directory_id, logout]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Stack
        spacing={1}
        sx={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        {/* Breadcrumb */}
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          {directoryStack.map((dir, index) => (
            <Chip
              key={index}
              label={
                <Typography variant="h6" color="text.secondary">
                  {dir.name}
                </Typography>
              }
              sx={{
                padding: 1,
              }}
              onClick={() => {
                if (index !== directoryStack.length - 1) {
                  setDirectoryStack(directoryStack.slice(0, index + 1));
                  setCurrentDirectoryByID(directoryStack[index].directory_id);
                }
              }}
            />
          ))}
        </Breadcrumbs>

        {/* Directory Table */}
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <DirectoryTable
            currentDirectoryContents={currentDirectory}
            handleSelect={handleSelect}
            handleEnterDir={handleEnterDir}
            selectedItems={selectedItems}
          />
        </Box>

        {/* AddActionFAB */}
        <AddActionFAB
          onUploadFileDialog={() => setOpenUploadFileDialog(true)}
          onNewFolderDialog={() => setOpenNewFolderDialog(true)}
          disabled={isLoading || !currentDirectory}
        />

        {/* Dialogs */}

        <UploadFileDialog
          isOpen={openUploadFileDialog}
          setIsOpen={setOpenUploadFileDialog}
          currentDirectoryID={currentDirectory?.directory_id}
          onSubmit={() => {
            setIsLoading(true);
            return getDirectoryContentsByID(
              accessToken,
              currentDirectory.directory_id,
              logout
            ).then((newDirectory: DirectoryContents) => {
              setCurrentDirectory(newDirectory);
              setIsLoading(false);
            });
          }}
        />

        <NewFolderDialog
          isOpen={openNewFolderDialog}
          setIsOpen={setOpenNewFolderDialog}
          onSubmit={(newFolderName: string) => {
            return currentDirectory
              ? handleNewDirectory(
                  accessToken,
                  currentDirectory.directory_id,
                  newFolderName,
                  logout
                ).then(() => {
                  setIsLoading(true);
                  getDirectoryContentsByID(
                    accessToken,
                    currentDirectory.directory_id,
                    logout
                  ).then((newDirectory: DirectoryContents) => {
                    setCurrentDirectory(newDirectory);
                    setIsLoading(false);
                  });
                })
              : Promise.reject(new Error("No current directory"));
          }}
        />
      </Stack>
    </Box>
  );
};

export default DriveTab;
