import {
  Button,
  Grow,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  registerUserWithJoinCode,
  registerUserWithNewOrg,
} from "../../utils/ApiHandlers/AccountRegistrationHandler";

type registerChoice = "joinCode" | "newOrganization" | null;

// TODO: Implement RegisterPage
const RegisterPage = () => {
  const [registerChoice, setRegisterChoice] = useState<registerChoice>(null);
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        // first form submit, next step is to show the join code or new organization form
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("registerEmail") as string;
        const emailConfirm = formData.get("registerEmailConfirm") as string;
        const password = formData.get("registerPassword") as string;
        const passwordConfirm = formData.get(
          "registerPasswordConfirm"
        ) as string;
        const firstName = formData.get("registerFirstName") as string;
        const lastName = formData.get("registerLastName") as string;

        // Check if email and password confirmation fields match
        if (email !== emailConfirm) {
          alert("Email addresses do not match.");
          return;
        }
        if (password !== passwordConfirm) {
          alert("Passwords do not match.");
          return;
        }

        const afterResponse = () => {
          setRegisterChoice(null);
          navigate("/login");
        };

        if (registerChoice === "joinCode") {
          const joinCode = formData.get("registerJoinCode") as string;
          registerUserWithJoinCode(
            email,
            password,
            firstName,
            lastName,
            joinCode
          ).then(afterResponse);
        } else if (registerChoice === "newOrganization") {
          const organizationName = formData.get(
            "registerOrganizationName"
          ) as string;
          registerUserWithNewOrg(
            email,
            password,
            firstName,
            lastName,
            organizationName
          ).then(afterResponse);
        }
      }}
    >
      <Stack
        direction="row"
        paddingTop={5}
        alignItems="center"
        justifyContent="center"
        spacing={5}
        sx={{
          width: "100%",
        }}
      >
        <Paper
          sx={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <Stack direction="column" spacing={2}>
            <Typography variant="h4">Registration</Typography>

            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              Personal Information
            </Typography>
            <TextField
              variant="outlined"
              name="registerFirstName"
              placeholder="Enter First Name"
              required
            />
            <TextField
              variant="outlined"
              name="registerLastName"
              placeholder="Enter Last Name"
              required
            />
            <TextField
              variant="outlined"
              type="email"
              name="registerEmail"
              placeholder="Enter Email"
              required
            />
            <TextField
              variant="outlined"
              type="email"
              name="registerEmailConfirm"
              placeholder="Confirm Email"
              required
            />
            <Typography variant="h6" sx={{ textDecoration: "underline" }}>
              Password
            </Typography>
            <TextField
              variant="outlined"
              type="password"
              name="registerPassword"
              placeholder="Enter Password"
              required
            />
            <TextField
              variant="outlined"
              type="password"
              name="registerPasswordConfirm"
              placeholder="Confirm Password"
              required
            />

            <Typography variant="body1" sx={{ textDecoration: "underline" }}>
              Select one of the options below:
            </Typography>
            <Stack spacing={1} justifyContent="center">
              <Button
                variant={
                  registerChoice === "joinCode" ? "contained" : "outlined"
                }
                onClick={() => setRegisterChoice("joinCode")}
              >
                I have a join code
              </Button>
              <Button
                variant={
                  registerChoice === "newOrganization"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => setRegisterChoice("newOrganization")}
              >
                I want to create a new organization
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Grow in={registerChoice !== null} timeout={1000}>
          <Paper
            sx={{
              paddingTop: 5,
              paddingBottom: 5,
              paddingLeft: 5,
              paddingRight: 5,
            }}
          >
            <Stack spacing={1}>
              {registerChoice === "joinCode" && (
                <>
                  <Typography variant="h6">Join Code</Typography>
                  <TextField
                    variant="outlined"
                    name="registerJoinCode"
                    placeholder="Enter Join Code"
                  />
                  <Button variant="contained" type="submit">
                    Register User and Join Organization
                  </Button>
                </>
              )}

              {registerChoice === "newOrganization" && (
                <>
                  <Typography variant="h6">New Organization</Typography>
                  <TextField
                    variant="outlined"
                    name="registerOrganizationName"
                    placeholder="Enter Organization Name"
                  />
                  <Button variant="contained" type="submit">
                    Register User and Organization
                  </Button>
                </>
              )}
            </Stack>
          </Paper>
        </Grow>
      </Stack>
    </form>
  );
};

export default RegisterPage;
