import SelectDishPortionsForm from "@/components/dish-portions-form/SelectDishPortionsForm";
import { useOutletContext } from "react-router-dom";
import { Dish } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import { useState } from "react";
import { useIngredientMutations } from "@/hooks/use-ingredients-mutations";

function DishIngredientAdd() {
  const { dish } = useOutletContext<{ dish: Dish }>();
  const [selectedPortions, setSelectedPortions] = useState<DishPortion[]>([]);
  const { add, update, remove } = useIngredientMutations(dish);

  const handleAddIngredients = async (ingredient: DishPortion) => {
    add.mutate(ingredient, {
      onSuccess: (response) => {
        setSelectedPortions((portions) => [...portions, response]);
      },
    });
  };

  const handleUpgradeIngredient = async (ingredient: DishPortion) => {
    update.mutate(ingredient, {
      onSuccess: (response) => {
        setSelectedPortions((portions) =>
          portions.map((p) => (p.id === response.id ? response : p)),
        );
      },
    });
  };

  const handleDeleteIngredient = async (ingredient: DishPortion) => {
    remove.mutate(ingredient, {
      onSuccess: () => {
        setSelectedPortions((portions) =>
          portions.filter((p) => p.id !== ingredient.id),
        );
      },
    });
  };

  return (
    <SelectDishPortionsForm
      filterDishId={dish.id}
      title="Select Ingredient"
      subtitle={"For " + dish.name}
      selectedPortions={selectedPortions}
      onAdd={handleAddIngredients}
      onUpdate={handleUpgradeIngredient}
      onDelete={handleDeleteIngredient}
    />
  );
}

export default DishIngredientAdd;
