import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/ApiHandlers/AccountRegistrationHandler";

// TODO: Implement RegisterPage
const RegisterPage = () => {
  const navigate = useNavigate();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("registerEmail") as string;
    const emailConfirm = formData.get("registerEmailConfirm") as string;
    const password = formData.get("registerPassword") as string;
    const passwordConfirm = formData.get("registerPasswordConfirm") as string;
    const firstName = formData.get("registerFirstName") as string;
    const lastName = formData.get("registerLastName") as string;

    if (email !== emailConfirm) {
      alert("Email addresses do not match.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    registerUser(email, password, firstName, lastName).then(() => {
      navigate("/login");
    });
  };
  return (
    <form onSubmit={onFormSubmit}>
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
            width: "50%",
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
            <Button variant="contained" type="submit">
              Register
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </form>
  );
};

export default RegisterPage;
