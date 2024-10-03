import { getPrivateData } from "./PrivateAPIHandler";

export type FileDescription = {
  file_id: string;
  name: string;
  created_at: Date;
  created_by: string;
  file_size: number;
};

export type SubDirectoryDescription = {
  directory_id: string;
  name: string;
  created_at: Date;
  created_by: string;
};

export type DirectoryContents = {
  current_directory_id: string;
  name: string;
  files: FileDescription[];
  sub_directories: SubDirectoryDescription[];
};

// TODO: Implement this
// if directory_id is -1, get the root directory
// else get the directory with the given directory_id
export const getDirectoryContentsByID = async (
  access_token: string,
  directory_id: string
): Promise<DirectoryContents> => {
  const response = await getPrivateData(
    `api/organization/get-folder-by-id/${directory_id}/`,
    access_token
  );
  return response.data as DirectoryContents;
};

// // TODO: Implement this
// export const handleUploadFiles = async (
//   access_token: string,
//   directory_id: string,
//   files: File[]
// ): Promise<void> => {
//   // Simulate API call with a 3-second delay
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   return;
// };

// // TODO: Implement this
// export const handleNewDirectory = async (
//   access_token: string,
//   parent_directory_id: string,
//   directory_name: string
// ): Promise<void> => {
//   // Simulate API call with a 3-second delay
//   await new Promise((resolve) => setTimeout(resolve, 3000));

//   return;
// };
