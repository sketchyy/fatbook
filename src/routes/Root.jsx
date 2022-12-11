import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../core/Navbar";

function Root(props) {
  return (
    <Fragment>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </Fragment>
  );
}

export default Root;
