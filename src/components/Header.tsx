import { Link, useLocation } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <nav>
      {user ? `Hello ${user.username}` : "Hello Guest"}
      <span> | </span>
      <Link to="/">Home</Link>
      <span> | </span>
      {user ? (
        <a onClick={logout}>Logout</a>
      ) : (
        <Link to="/login" state={{ from: location }}>
          Login
        </Link>
      )}
      <span> | </span>
      {user ? <Link to="/private">Private</Link> : null}
    </nav>
  );
};

export default Header;
