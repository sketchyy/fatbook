import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import dishesDbService from "../../../core/firebase/dishesDbService";
import SelectDishPortionsForm from "../../../shared/components/dish-portions-form/SelectDishPortionsForm";

function AddIngredientForm(props) {
  const { dish } = useOutletContext();
  const navigate = useNavigate();

  const handleAddIngredientsSubmit = async (ingredients) => {
    dish.addIngredients(ingredients);

    await dishesDbService.replaceDish(dish);
    navigate(`/dishes/${dish.id}/ingredients`);
  };

  return (
    <SelectDishPortionsForm
      title="Select Ingredient"
      subtitle={"For " + dish.name}
      onSubmit={handleAddIngredientsSubmit}
    />
  );
}

export default AddIngredientForm;
