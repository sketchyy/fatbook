import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useIsFetching } from "@tanstack/react-query";
import { clsx } from "clsx";

function Root() {
  return (
    <>
      <Navbar />
      <div className={clsx("container is-max-desktop")}>
        <div className="column is-8 is-offset-2">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Root;
