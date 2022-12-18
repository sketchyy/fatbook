import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import dateService from "../../services/dateService";
import DaySummaryCard from "./DaySummaryCard";
import MealCard from "./MealCard";

function Eatings(props) {
  const navigate = useNavigate();
  const [day, setDay] = useState(dateService.parse());

  return (
    <Fragment>
      <DaySummaryCard />
      <MealCard meal="breakfast" day={day} />
      <MealCard meal="lunch" day={day} />
      <MealCard meal="dinner" day={day} />
      <MealCard meal="snack" day={day} />
    </Fragment>
  );
}

export default Eatings;
