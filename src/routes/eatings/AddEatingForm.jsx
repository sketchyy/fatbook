import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import SelectDishPortionForm from "../../shared/SelectDishPortionForm";

function AddEatingForm(props) {
  const navigate = useNavigate();
  const { day, meal } = useParams();

  const handleAddEatingSubmit = async (ingredient) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.addEating(meal, ingredient);

    await eatingsDbService.replaceLogDay(day, logDay);

    navigate(`/eatings/${day}/${meal}`);
  };

  return (
    <SelectDishPortionForm
      title="Select Dish"
      //   Render today/yesterday/date
      subtitle={`For ${day} ${meal}`}
      onSubmit={handleAddEatingSubmit}
    />
  );
}

export default AddEatingForm;
