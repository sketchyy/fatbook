import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import dishesDbService from "../../../core/firebase/dishesDbService";
import SelectDishPortionsForm from "../../../shared/components/dish-portions-form/SelectDishPortionsForm";

function AddIngredientForm(props) {
  const { dish } = useOutletContext();
  const navigate = useNavigate();

  const handleAddIngredients = async (ingredient) => {
    dish.addIngredients([ingredient]);

    await dishesDbService.replaceDish(dish);
  };

  const handleDeleteIngredients = async (ingredient) => {
    dish.deleteIngredient(ingredient);

    await dishesDbService.replaceDish(dish);
  };

  return (
    <SelectDishPortionsForm
      title="Select Ingredient"
      subtitle={"For " + dish.name}
      onAdd={handleAddIngredients}
      onDelete={handleDeleteIngredients}
    />
  );
}

export default AddIngredientForm;
