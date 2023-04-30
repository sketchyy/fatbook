import dishesService from "@/core/firebase/dishesService";
import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import Dish from "@/shared/models/Dish";
import { useOutletContext } from "react-router-dom";

function AddIngredientForm(props) {
  const { dish } = useOutletContext<{ dish: Dish }>();

  const handleAddIngredients = async (ingredient) => {
    dish.addIngredients([ingredient]);

    await dishesService.replaceDish(dish);
  };

  const handleDeleteIngredients = async (ingredient) => {
    dish.deleteIngredient(ingredient);

    await dishesService.replaceDish(dish);
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
