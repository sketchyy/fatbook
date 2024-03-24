import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import { useOutletContext } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { Dish } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import ingredientsService from "@/services/ingredients-service";
import { useState } from "react";

type MutationArg = { dish: Dish; ingredient: DishPortion };

function AddIngredient() {
  const { dish } = useOutletContext<{ dish: Dish }>();
  const [selectedPortions, setSelectedPortions] = useState<DishPortion[]>([]);

  /* const {addIngredient, update, delete} = useIngredientMutations() */
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("dish");
  const addIngredient = useMutation(
    (ingredient: DishPortion) =>
      ingredientsService.addIngredient(dish, ingredient),
    { onSuccess },
  );
  const updateIngredient = useMutation(
    (ingredient: DishPortion) =>
      ingredientsService.updateIngredient(dish, ingredient),
    { onSuccess },
  );
  const deleteIngredient = useMutation(
    (ingredient: DishPortion) =>
      ingredientsService.deleteIngredient(dish, ingredient),
    { onSuccess },
  );

  const handleAddIngredients = async (ingredient: DishPortion) => {
    addIngredient.mutate(ingredient, {
      onSuccess: (response) => {
        setSelectedPortions((portions) => [...portions, response]);
      },
    });
  };

  const handleUpgradeIngredient = async (ingredient: DishPortion) => {
    updateIngredient.mutate(ingredient, {
      onSuccess: (response) => {
        setSelectedPortions((portions) =>
          portions.map((p) => (p.id === response.id ? response : p)),
        );
      },
    });
  };

  const handleDeleteIngredient = async (ingredient: DishPortion) => {
    deleteIngredient.mutate(ingredient, {
      onSuccess: () => {
        setSelectedPortions((portions) =>
          portions.filter((p) => p.id !== ingredient.id),
        );
      },
    });
  };

  return (
    <SelectDishPortionsForm
      title="Select Ingredient"
      subtitle={"For " + dish.name}
      selectedPortions={selectedPortions}
      onAdd={handleAddIngredients}
      onUpdate={handleUpgradeIngredient}
      onDelete={handleDeleteIngredient}
    />
  );
}

export default AddIngredient;
