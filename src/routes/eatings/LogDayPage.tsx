import eatingsServiceOld from "@/core/firebase/eatingsServiceOld";
import { LogDay } from "@/shared/models/LogDay";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

/* EatingsPage */
function LogDayPage() {
  const params = useParams();
  const day = params.day;
  const [logDay, setLogDay] = useState(LogDay.empty());

  useEffect(() => {
    // const unsubscribe = eatingsService.subscribeToLogDayChanges(
    //   day,
    //   (dbLogDay) => {
    //     console.log("Log Day = ", dbLogDay);
    //     if (dbLogDay) {
    //       setLogDay(dbLogDay);
    //     } else {
    //       setLogDay(LogDay.empty());
    //     }
    //   },
    // );
    // return unsubscribe;
  }, [day]);

  return <Outlet context={{ day, logDay }} />;
}

export default LogDayPage;
