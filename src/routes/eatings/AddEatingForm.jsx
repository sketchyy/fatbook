import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import SelectDishPortionsForm from "../../shared/components/SelectDishPortionsForm";

function AddEatingForm(props) {
  const navigate = useNavigate();
  const { day, meal } = useParams();

  const handleAddEatingsSubmit = async (portions) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.addEatings(meal, portions);

    await eatingsDbService.replaceLogDay(day, logDay);

    navigate(`/eatings/${day}/${meal}`);
  };

  return (
    <SelectDishPortionsForm
      title="Select Dish"
      // TODO:  Render today/yesterday/date
      subtitle={`${meal}, ${day}`}
      onSubmit={handleAddEatingsSubmit}
    />
  );
}

export default AddEatingForm;
