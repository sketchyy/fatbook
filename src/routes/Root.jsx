import React, { Fragment } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../core/Navbar";

function Root(props) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Fragment>
      <Navbar />
      <div className={"container" + (isLoading ? " loading" : "")}>
        <Outlet />
      </div>
    </Fragment>
  );
}

export default Root;
