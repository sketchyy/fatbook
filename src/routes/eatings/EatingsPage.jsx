import React, { Fragment } from "react";
import DaySummaryCard from "./DaySummaryCard";
import MealCard from "./MealCard";

function Eatings(props) {
  return (
    <Fragment>
      <DaySummaryCard />
      <MealCard meal="Breakfast" />
      <MealCard meal="Lunch" />
      <MealCard meal="Dinner" />
      <MealCard meal="Snack" />
    </Fragment>
  );
}

export default Eatings;
