import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../core/Navbar";
import { useIsFetching } from "react-query";
import { clsx } from "clsx";

function Root() {
  const fetchingCount = useIsFetching();
  const isLoading = fetchingCount > 0;

  return (
    <Fragment>
      <Navbar />
      <div
        className={clsx("container is-max-desktop ", { loading: isLoading })}
      >
        <div className="column is-8 is-offset-2">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
}

export default Root;
