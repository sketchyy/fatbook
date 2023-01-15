import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import { LogDay } from "../../shared/models/LogDay";

function LogDayPage(props) {
  const params = useParams();
  const day = params.day;
  const [logDay, setLogDay] = useState(LogDay.empty());

  useEffect(() => {
    const unsubscribe = eatingsDbService.subscribeToLogDayChanges(
      day,
      (dbLogDay) => {
        console.log("Log Day = ", dbLogDay);
        if (dbLogDay) {
          setLogDay(dbLogDay);
        } else {
          setLogDay(LogDay.empty());
        }
      }
    );
    return unsubscribe;
  }, [day]);

  return <Outlet context={{ day, logDay }} />;
}

export default LogDayPage;
