import { getPrivateData, postPrivateData } from "./PrivateAPIHandler";

export type FileDescription = {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  file_size: number;
};

export type DirectoryDescription = {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
};

export type DirectoryContents = {
  id: string;
  name: string;
  files: FileDescription[];
  sub_directories: DirectoryDescription[];
};

export const getDirectoryContentsByID = async (
  access_token: string,
  directory_id: string,
  logout: () => void
): Promise<DirectoryContents> => {
  const response = await getPrivateData(
    `api/organization/get-directory-by-id/${directory_id}/`,
    access_token,
    logout
  );

  return response?.data as DirectoryContents;
};

export const handleUploadFiles = async (
  access_token: string,
  directory_id: string,
  file: File,
  logout: () => void
): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("parent_directory_id", directory_id);

  await postPrivateData(
    formData as unknown as Record<string, unknown>,
    "api/organization/new-file/",
    access_token,
    logout
  );

  return;
};

export const handleNewDirectory = async (
  access_token: string,
  parent_directory_id: string,
  directory_name: string,
  logout: () => void
): Promise<void> => {
  await postPrivateData(
    {
      new_directory_name: directory_name,
      parent_directory_id: parent_directory_id,
    },
    "api/organization/new-directory/",
    access_token,
    logout
  );
};
