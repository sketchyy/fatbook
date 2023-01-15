import React, { Fragment } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import dateService from "../../shared/services/dateService";
import MealCard from "./MealCard";

function LogDaySummary({ onDayChange }) {
  const navigate = useNavigate();
  const { day } = useOutletContext();
  const parsedDay = dateService.format(dateService.parse(day), "YYYY-MM-DD");

  const handleDayChange = (e) => {
    console.log("qweqwe=", e.target.value);
    const selectedDay = dateService.format(e.target.value);
    navigate(`/eatings/${selectedDay}`);
  };

  return (
    <Fragment>
      <MealCard meal="summary">
        <input
          type="date"
          className="input"
          defaultValue={parsedDay}
          onChange={handleDayChange}
        />
      </MealCard>
      <MealCard meal="breakfast" />
      <MealCard meal="lunch" />
      <MealCard meal="dinner" />
      <MealCard meal="snack" />
    </Fragment>
  );
}

export default LogDaySummary;
