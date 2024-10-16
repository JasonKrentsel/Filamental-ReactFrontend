import { AuthContextType } from "./AuthHandler";
import { getPrivateData, postPrivateData } from "./PrivateAPIHandler";

export type FileDescription = {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  file_size: number;
  embedded: boolean;
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
  authContext: AuthContextType,
  directory_id: string
): Promise<DirectoryContents> => {
  const response = await getPrivateData(
    authContext,
    `api/organization/get-directory-by-id/${directory_id}/`
  );

  return response?.data as DirectoryContents;
};

export const handleUploadFiles = async (
  authContext: AuthContextType,
  directory_id: string,
  file: File
): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("parent_directory_id", directory_id);

  await postPrivateData(
    authContext,
    "api/organization/new-file/",
    formData as unknown as Record<string, unknown>
  );

  return;
};

export const handleNewDirectory = async (
  authContext: AuthContextType,
  parent_directory_id: string,
  directory_name: string
): Promise<void> => {
  await postPrivateData(authContext, "api/organization/new-directory/", {
    new_directory_name: directory_name,
    parent_directory_id: parent_directory_id,
  });
};
