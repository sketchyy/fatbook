import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";
import SelectDishPortionForm from "../../../shared/SelectDishPortionForm";

function AddIngredientForm(props) {
  const { dish } = useOutletContext();
  const navigate = useNavigate();

  const handleAddIngredientSubmit = async (ingredient) => {
    dish.addIngredient(ingredient);

    await dbService.replaceDish(dish);
    navigate(`/dishes/${dish.id}/ingredients`);
  };

  return (
    <SelectDishPortionForm
      title="Select Ingredient"
      subtitle={"For " + dish.name}
      onSubmit={handleAddIngredientSubmit}
    />
  );
}

export default AddIngredientForm;
