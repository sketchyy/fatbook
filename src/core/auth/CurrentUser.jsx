import React from "react";
import authService from "../firebase/authService";

import { useAuthState } from "./useAuthState";

function CurrentUser(props) {
  const { user } = useAuthState();

  if (!user) {
    return "";
  }

  const handleLogout = () => {
    authService.logout();
  };

  const displayName = user.displayName.split(" ")[0];

  return (
    // TODO: align styles
    <div>
      <span>Hello, {displayName}</span>
      <button className="button is-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default CurrentUser;
