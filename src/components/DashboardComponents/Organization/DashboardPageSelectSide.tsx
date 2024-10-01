import { Stack, Divider, Skeleton } from "@mui/material";
import HomeButton from "./HomeButton";
import OrgButton from "./OrgButton";
import NewOrgButton from "./NewOrgButton";
import { OrgDescription } from "../../../utils/datatypes/Organization";
import SelectableContainer from "./SelectableContainer";
import { useTheme } from "@mui/material/styles";

interface DashboardPageSelectSideProps {
  userOrgs: OrgDescription[];
  selectedOrg: OrgDescription | null;
  setSelectedOrg: (org: OrgDescription | null) => void;
  isLoading: boolean;
}

const DashboardPageSelectSide = ({
  userOrgs,
  selectedOrg,
  setSelectedOrg,
  isLoading,
}: DashboardPageSelectSideProps) => {
  const theme = useTheme();

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
          <NewOrgButton />
        </SelectableContainer>
      </Stack>
    </div>
  );
};

export default DashboardPageSelectSide;
