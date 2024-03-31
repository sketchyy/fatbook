import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { DishPortion } from "@/types/dish-portion";
import {
  addIngredient,
  deleteIngredient,
  updateIngredient,
} from "@/services/ingredients-service";
import { Dish } from "@/types/dish";

type UseIngredientMutations = {
  add: UseMutationResult<DishPortion, unknown, DishPortion>;
  update: UseMutationResult<DishPortion, unknown, DishPortion>;
  remove: UseMutationResult<void, unknown, DishPortion>;
};

export function useIngredientMutations(dish: Dish): UseIngredientMutations {
  const queryClient = useQueryClient();

  const onSuccess = () => queryClient.invalidateQueries("dish");

  const add = useMutation(
    (ingredient: DishPortion) => addIngredient(dish, ingredient),
    { onSuccess },
  );

  const update = useMutation(
    (ingredient: DishPortion) => updateIngredient(dish, ingredient),
    { onSuccess },
  );

  const remove = useMutation(
    (ingredient: DishPortion) => deleteIngredient(dish, ingredient),
    { onSuccess },
  );

  return {
    add,
    update,
    remove,
  };
}
