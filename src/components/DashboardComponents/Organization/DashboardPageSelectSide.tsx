import { Stack, Divider, Skeleton } from "@mui/material";
import HomeButton from "./HomeButton";
import OrgButton from "./OrgButton";
import NewOrgButton from "./NewOrgButton";
import {
  NewOrganizationDescription,
  OrgDescription,
} from "../../../utils/datatypes/Organization";
import SelectableContainer from "./SelectableContainer";
import { useTheme } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import NewOrgDialog from "./Dialogs/NewOrgDialog";
import AuthContext from "../../../context/AuthContext";
import { getUserOrgDescriptions } from "../../../utils/ApiHandlers/OrganizationInfoHandler";

interface DashboardPageSelectSideProps {
  selectedOrg: OrgDescription | null;
  setSelectedOrg: (org: OrgDescription | null) => void;
}

const DashboardPageSelectSide = ({
  selectedOrg,
  setSelectedOrg,
}: DashboardPageSelectSideProps) => {
  const theme = useTheme();
  const { accessToken } = useContext(AuthContext);
  const [isNewOrgDialogOpen, setIsNewOrgDialogOpen] = useState(false);
  const [userOrgs, setUserOrgs] = useState<OrgDescription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshOrgList = (accessToken: string) => {
    setIsLoading(true);
    getUserOrgDescriptions(accessToken).then((orgs: OrgDescription[]) => {
      setUserOrgs(orgs);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    refreshOrgList(accessToken);
  }, [accessToken]);

  const handleNewOrgCreation = async (newOrg: NewOrganizationDescription) => {
    console.log(newOrg);
    // Simulating a 3-second delay
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // TODO: Implement actual organization creation logic here
    console.log("Organization created after 3-second delay:", newOrg);

    refreshOrgList(accessToken);
  };

  return (
    <div
      style={{
        height: "100%",
        overflow: "scroll",
      }}
    >
      <Stack spacing={1} sx={{ paddingTop: 1, paddingBottom: 1 }}>
        <SelectableContainer selected={selectedOrg === null}>
          <HomeButton onClick={() => setSelectedOrg(null)} />
        </SelectableContainer>

        <Divider variant="middle" />

        {/* loop through and display user's orgs */}
        {isLoading ? (
          <>
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <SelectableContainer key={index} selected={false}>
                  <Skeleton
                    variant="circular"
                    width={theme.spacing(7)}
                    height={theme.spacing(7)}
                  />
                </SelectableContainer>
              ))}
            <Divider variant="middle" />
          </>
        ) : (
          userOrgs.map((org) => (
            <>
              <SelectableContainer
                selected={selectedOrg?.org_id === org.org_id}
              >
                <OrgButton
                  key={org.org_id}
                  orgDescription={org}
                  fabProps={{ onClick: () => setSelectedOrg(org) }}
                />
              </SelectableContainer>
              <Divider variant="middle" />
            </>
          ))
        )}

        <SelectableContainer selected={false}>
          <NewOrgButton onClick={() => setIsNewOrgDialogOpen(true)} />
        </SelectableContainer>

        <NewOrgDialog
          isOpen={isNewOrgDialogOpen}
          setIsOpen={setIsNewOrgDialogOpen}
          onSubmitOrg={handleNewOrgCreation}
        />
      </Stack>
    </div>
  );
};

export default DashboardPageSelectSide;
