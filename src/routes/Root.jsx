import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../core/Navbar";

function Root(props) {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Root;
