import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import dateService from "../../shared/services/dateService";
import MealCard from "./MealCard";

function Eatings(props) {
  const navigate = useNavigate();
  const [day, setDay] = useState(dateService.parse());

  return (
    <Fragment>
      <MealCard meal="summary" day={day}>
        <input type="date" className="input" />
      </MealCard>
      <MealCard meal="breakfast" day={day} />
      <MealCard meal="lunch" day={day} />
      <MealCard meal="dinner" day={day} />
      <MealCard meal="snack" day={day} />
    </Fragment>
  );
}

export default Eatings;
