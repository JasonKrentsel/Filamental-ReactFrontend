import { postPrivateData } from "./PrivateAPIHandler";
import { AuthContextType } from "./AuthHandler";

export const searchQuery = async (
  authContext: AuthContextType,
  query: string,
  orgId: string
) => {
  const response = await postPrivateData(authContext, `/rag/query/`, {
    query: query,
    organization_id: orgId,
  });
  return response.data;
};
