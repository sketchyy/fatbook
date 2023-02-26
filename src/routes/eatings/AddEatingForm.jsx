import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import SelectDishPortionsForm from "../../shared/components/dish-portions-form/SelectDishPortionsForm";

function AddEatingForm(props) {
  const navigate = useNavigate();
  const { day, meal } = useParams();

  const handleAddEatings = async (portion) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.addEatings(meal, [portion]);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  const handleDeleteEatings = async (portion) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.deleteEating(meal, portion);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  return (
    <SelectDishPortionsForm
      title="Select Dish"
      // TODO:  Render today/yesterday/date
      subtitle={`${meal}, ${day}`}
      onAdd={handleAddEatings}
      onDelete={handleDeleteEatings}
    />
  );
}

export default AddEatingForm;
