import { useState } from "react";
import authService from "@/core/firebase/authService";
import { useLocation, useNavigate } from "react-router-dom";

/* Used for Cypress Tests, not available in PROD build */
export default function LoginWithPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const from = location.state?.from?.pathname || "/";

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await authService.loginWithPassword(email, password);

    navigate(from, { replace: true });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
