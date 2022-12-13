import React, { Fragment } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../core/Navbar";

function Root(props) {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <Fragment>
      <Navbar />
      <div
        className={"container is-max-desktop " + (isLoading ? " loading" : "")}
      >
        <div className="column is-8 is-offset-2">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}

export default Root;
