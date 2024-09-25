import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";

import PrivateRoute from "./utils/PrivateRoute";

import { AuthProvider } from "./context/AuthContext";
import PrivatePage from "./pages/PrivatePage";

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/private"
              element={
                <PrivateRoute>
                  <PrivatePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
