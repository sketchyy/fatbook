import dishesServiceOld from "@/core/firebase/dishesServiceOld";
import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import { useOutletContext } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Dish } from "@/types/dish";
import { DishPortionInputs } from "@/types/dish-portion";
import ingredientsService from "@/services/ingredients-service";

function AddIngredient() {
  const { dish } = useOutletContext<{ dish: Dish }>();
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ dish, ingredient }: { dish: Dish; ingredient: DishPortionInputs }) =>
      ingredientsService.addIngredient(dish, ingredient),
  );

  const handleAddIngredients = async (ingredient: DishPortionInputs) => {
    mutation.mutate(
      { dish, ingredient },
      {
        onSuccess: () => queryClient.invalidateQueries("dish"),
      },
    );
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

export default AddIngredient;
