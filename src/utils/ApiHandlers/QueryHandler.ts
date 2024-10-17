import { postPrivateData } from "./PrivateAPIHandler";
import { AuthContextType } from "./AuthHandler";

export type QueryResult = {
  rag_page_id: string;
  similarity_score: number;
  file_id: string;
  file_name: string;
  file_page: number;
};

export const searchQuery = async (
  authContext: AuthContextType,
  query: string,
  orgId: string
) => {
  const response = await postPrivateData(authContext, `/rag/query/`, {
    query: query,
    organization_id: orgId,
  });
  return response.data as QueryResult[];
};
