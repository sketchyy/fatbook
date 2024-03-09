import dishesServiceOld from "@/core/firebase/dishesServiceOld";
import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import DishClass from "@/shared/models/DishClass";
import { useOutletContext } from "react-router-dom";
import { DishPortionOld } from "@/shared/models/DishPortionOld";
import { useMutation, useQueryClient } from "react-query";

function AddIngredientForm() {
  const { dish } = useOutletContext<{ dish: DishClass }>();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ dish, ingredient }: { dish: DishClass; ingredient: DishPortionOld }) =>
      dishesServiceOld.addIngredient(dish, ingredient),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("dish");
      },
    },
  );

  const handleAddIngredients = async (ingredient: DishPortionOld) => {
    dish.addIngredient(ingredient);

    mutation.mutate({ dish, ingredient });
  };

  const handleDeleteIngredients = async (ingredient) => {
    dish.deleteIngredient(ingredient);

    await dishesServiceOld.replaceDish(dish);
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
