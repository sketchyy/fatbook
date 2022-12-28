import React, { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "../../core/auth/useAuthState";
import authService from "../../core/firebase/authService";

function Login(props) {
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    await authService.login();

    navigate(from, { replace: true });
  };

  return (
    // TODO: Message "To use the app please login", layout fixes
    <div>
      <button className="button is-primary" onClick={handleLogin}>
        <span className="icon">
          <FaGoogle />
        </span>
        <span>Login with Google</span>
      </button>
    </div>
  );
}

export default Login;
