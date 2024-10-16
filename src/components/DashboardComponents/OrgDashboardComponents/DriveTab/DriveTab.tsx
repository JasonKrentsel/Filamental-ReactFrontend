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
    id: currentOrg.org_root_directory_id,
    name: "Loading...",
    files: [],
    sub_directories: [],
  });

  const [directoryStack, setDirectoryStack] = useState<
    {
      id: string;
      name: string;
    }[]
  >([currentDirectory]);
  const tableRef = useRef<HTMLDivElement>(null);

  const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);
  const [openNewFolderDialog, setOpenNewFolderDialog] = useState(false);

  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [selectedDirectories, setSelectedDirectories] = useState<Set<string>>(
    new Set()
  );

  const handleSelect = (
    type: "file" | "directory",
    id: string,
    event: React.MouseEvent,
    rightClick: boolean = false
  ) => {
    if (type === "file") {
      setSelectedFiles((prevSelected) => {
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
          if (!rightClick || !newSelected.has(id)) {
            setSelectedDirectories(new Set());
            newSelected.clear();
          }
          newSelected.add(id);
        }
        return newSelected;
      });
    } else if (type === "directory") {
      setSelectedDirectories((prevSelected) => {
        const newSelected = new Set(prevSelected);
        if (event.ctrlKey || event.shiftKey) {
          if (newSelected.has(id)) {
            newSelected.delete(id);
          } else {
            newSelected.add(id);
          }
        } else {
          if (!rightClick || !newSelected.has(id)) {
            setSelectedFiles(new Set());
            newSelected.clear();
          }
          newSelected.add(id);
        }
        return newSelected;
      });
    }
  };

  const setCurrentDirectoryByID = (directory_id: string) => {
    getDirectoryContentsByID(authContext, directory_id).then(
      (newDirectory: DirectoryContents) => {
        setCurrentDirectory(newDirectory);
      }
    );
  };

  const handleEnterDir = (directory_id: string) => {
    setIsLoading(true);
    getDirectoryContentsByID(authContext, directory_id).then(
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
      authContext,
      currentOrg.org_root_directory_id
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
        // Deselect everything when clicking outside the DirectoryTable
        setSelectedFiles(new Set());
        setSelectedDirectories(new Set());
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [authContext, currentOrg.org_root_directory_id]);

  return (
    <Stack height="100%" maxHeight="100%">
      {/* Breadcrumb */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{
          paddingLeft: 1,
        }}
      >
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
                setCurrentDirectoryByID(directoryStack[index].id);
              }
            }}
          />
        ))}
      </Breadcrumbs>

      {/* Directory Table */}
      <Box ref={tableRef}>
        <DirectoryTable
          currentDirectoryContents={currentDirectory}
          handleSelect={handleSelect}
          handleEnterDir={handleEnterDir}
          selectedFiles={selectedFiles}
          selectedDirectories={selectedDirectories}
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
        currentDirectoryID={currentDirectory?.id}
        onSubmit={() => {
          setIsLoading(true);
          return getDirectoryContentsByID(
            authContext,
            currentDirectory.id
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
                authContext,
                currentDirectory.id,
                newFolderName
              ).then(() => {
                setIsLoading(true);
                getDirectoryContentsByID(authContext, currentDirectory.id).then(
                  (newDirectory: DirectoryContents) => {
                    setCurrentDirectory(newDirectory);
                    setIsLoading(false);
                  }
                );
              })
            : Promise.reject(new Error("No current directory"));
        }}
      />
    </Stack>
  );
};

export default DriveTab;
