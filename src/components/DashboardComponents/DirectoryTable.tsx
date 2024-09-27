import DirectoryTableItem from "./DirectoryTableItem";
import { Directory } from "../../utils/FileStructure/Directory";
import { Divider } from "@mui/material";

import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

interface DirectoryTableProps {
  directory: Directory;
}

const DirectoryTable = ({ directory }: DirectoryTableProps) => {
  return (
    <div>
      {directory.files.map((file) => (
        <div key={file.name}>
          <DirectoryTableItem
            icon={<InsertDriveFileIcon />}
            key={file.name}
            name={file.name}
            created_at={file.created_at}
            created_by={file.created_by}
            file_size={file.file_size}
          />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default DirectoryTable;
