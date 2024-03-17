import dishesServiceOld from "@/core/firebase/dishesServiceOld";
import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import { useOutletContext } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Dish } from "@/types/dish";
import { DishPortionInputs } from "@/types/dish-portion";
import ingredientsService from "@/services/ingredients-service";
import insert from "react-hook-form/dist/utils/insert";

type MutationArg = { dish: Dish; ingredient: DishPortionInputs };

function AddIngredient() {
  const { dish } = useOutletContext<{ dish: Dish }>();
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("dish");
  const addIngredient = useMutation(
    ({ dish, ingredient }: MutationArg) =>
      ingredientsService.addIngredient(dish, ingredient),
    { onSuccess },
  );
  const updateIngredient = useMutation(
    ({ dish, ingredient }: MutationArg) =>
      ingredientsService.updateIngredient(dish, ingredient),
    { onSuccess },
  );
  const deleteIngredient = useMutation(
    ({ dish, ingredient }: MutationArg) =>
      ingredientsService.deleteIngredient(dish, ingredient),
    { onSuccess },
  );

  const handleAddIngredients = async (ingredient: DishPortionInputs) => {
    addIngredient.mutate({ dish, ingredient });
  };

  const handleUpgradeIngredient = async (ingredient: DishPortionInputs) => {
    updateIngredient.mutate({ dish, ingredient });
  };

  const handleDeleteIngredient = async (ingredient: DishPortionInputs) => {
    deleteIngredient.mutate({ dish, ingredient });
  };

  return (
    <SelectDishPortionsForm
      title="Select Ingredient"
      subtitle={"For " + dish.name}
      onAdd={handleAddIngredients}
      onUpdate={handleUpgradeIngredient}
      onDelete={handleDeleteIngredient}
    />
  );
}

export default AddIngredient;
