import { Box, Button, Input, Typography } from "@mui/material";
import { OrgDescription } from "../../../../utils/ApiHandlers/OrganizationInfoHandler";
import { useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import {
  QueryResult,
  searchQuery,
} from "../../../../utils/ApiHandlers/QueryHandler";

interface ChatTabProps {
  currentOrg: OrgDescription;
}

const ChatTab = ({ currentOrg }: ChatTabProps) => {
  const authContext = useContext(AuthContext);
  const [response, setResponse] = useState<QueryResult[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQueryText = formData.get("search") as string;
    if (searchQueryText) {
      searchQuery(authContext, searchQueryText, currentOrg.org_id).then(
        (res) => {
          setResponse(res);
        }
      );
    }
  };

  return (
    <Box
      height="100%"
      maxHeight="100%"
      width="100%"
      maxWidth="100%"
      padding={2}
    >
      <Typography variant="h6">
        {currentOrg.org_name} - {currentOrg.org_id} - Chat
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Input
          placeholder="Search"
          name="search"
          sx={{
            width: "100%",
            height: "100%",
          }}
        ></Input>
        <Button type="submit">Search</Button>
      </form>
      {response.map((result) => (
        <Typography>
          {result.file_name} - Page {result.file_page} - Similarity Score:{" "}
          {result.similarity_score}
        </Typography>
      ))}
    </Box>
  );
};

export default ChatTab;
