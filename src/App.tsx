import { AuthProvider } from "./context/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Forms/LoginPage";
import UserDashboard from "./pages/UserDashboard";

import PrivateRoute from "./utils/PrivateRoute";
import StyledHeader from "./components/HeaderComponents/StyledHeader";

import { Stack } from "@mui/material";
import RegisterPage from "./pages/Forms/RegisterPage";

function App() {
  return (
    <div style={{ width: "100%", padding: "0px" }}>
      <AuthProvider>
        <Router>
          <Stack sx={{ width: "100%", padding: "0px" }}>
            <StyledHeader />

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <UserDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Stack>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
