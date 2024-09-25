import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

interface PrivateRouteProps {
  redirectPath?: string; // Path to redirect if not authenticated
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  redirectPath = "/login", // Default redirect path
  children,
}) => {
  const location = useLocation();
  const { user } = useContext(AuthContext);

  if (!user) {
    // Redirect if not authenticated, preserving the location state
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // Render the protected children if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
