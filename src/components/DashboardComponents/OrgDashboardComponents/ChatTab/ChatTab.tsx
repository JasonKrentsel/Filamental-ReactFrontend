import { Box, Button, Input, Typography } from "@mui/material";
import { OrgDescription } from "../../../../utils/ApiHandlers/OrganizationInfoHandler";
import { useContext, useState } from "react";
import AuthContext from "../../../../context/AuthContext";
import { searchQuery } from "../../../../utils/ApiHandlers/QueryHandler";

interface ChatTabProps {
  currentOrg: OrgDescription;
}

const ChatTab = ({ currentOrg }: ChatTabProps) => {
  const authContext = useContext(AuthContext);
  const [response, setResponse] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const searchQueryText = formData.get("search") as string;
    if (searchQueryText) {
      searchQuery(authContext, searchQueryText, currentOrg.org_id).then(
        (res) => {
          console.log(res);
          const formattedResponse = JSON.stringify(res, null, 2); // Format JSON with 2 spaces
          setResponse(formattedResponse);
        }
      );
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography variant="h6">
        {currentOrg.org_name} - {currentOrg.org_id} - Chat
      </Typography>
      <form onSubmit={handleSubmit}>
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
      <Typography>{response}</Typography>
    </Box>
  );
};

export default ChatTab;
