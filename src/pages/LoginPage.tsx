import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const state = useLocation().state as { from?: Location };
  const navigate = useNavigate();

  return (
    <div>
      <form
        onSubmit={(e) => {
          login(e).then(() => {
            navigate(state.from || "/");
          });
        }}
      >
        <input type="text" placeholder="Enter Username" name="username" />
        <input type="password" placeholder="Enter Password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
