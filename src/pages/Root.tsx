import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useIsFetching } from "@tanstack/react-query";
import { clsx } from "clsx";

function Root() {
  const fetchingCount = useIsFetching({ queryKey: ["dishes"] });
  const isLoading = fetchingCount > 0;

  return (
    <>
      <Navbar />
      <div
        className={clsx({
          loading: isLoading,
        })}
      >
        <Outlet />
      </div>
    </>
  );
}

export default Root;
