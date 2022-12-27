import React from "react";
import { useAuthState } from "./auth/useAuthState";
import firebaseService from "./firebaseService";

function CurrentUser(props) {
  const { user } = useAuthState();

  if (!user) {
    return "";
  }

  const handleLogout = () => {
    firebaseService.logout();
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
