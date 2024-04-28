import SelectDishPortionsForm from "@/components/dish-portions-form/SelectDishPortionsForm";
import { useOutletContext } from "react-router-dom";
import { Dish } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import { useState } from "react";
import { useIngredientMutations } from "@/hooks/use-ingredients-mutations";
import Confirm, { Confirmation } from "@/components/ui/Confirm";
import { PostgrestError } from "@supabase/supabase-js";

function DishIngredientAdd() {
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });
  const { dish } = useOutletContext<{ dish: Dish }>();
  const { add, update, remove, selectedPortions, setSelectedPortions } =
    useIngredientMutations(dish);

  const handleAddIngredients = async (ingredient: DishPortion) => {
    add.mutate(ingredient, {
      onError: (error) => {
        // code:"23505" means "uniqueingredient" violated
        if ((error as PostgrestError).code === "23505") {
          setConfirm({
            visible: true,
            accept: async () => {
              setConfirm({ visible: false });
              await handleUpgradeIngredient(ingredient);
              setSelectedPortions((portions) => [
                ...portions,
                { ...ingredient, selected: true },
              ]);
            },
          });
        }
      },
    });
  };

  const handleUpgradeIngredient = async (ingredient: DishPortion) => {
    update.mutate(ingredient);
  };

  const handleDeleteIngredient = async (ingredient: DishPortion) => {
    remove.mutate(ingredient);
  };

  return (
    <>
      <SelectDishPortionsForm
        filterDishId={dish.id}
        title="Select Ingredient"
        subtitle={"For " + dish.name}
        selectedPortions={selectedPortions}
        onAdd={handleAddIngredients}
        onUpdate={handleUpgradeIngredient}
        onDelete={handleDeleteIngredient}
      />
      <Confirm
        message={`This dish is already added as ingredient. Do you want to overwrite?`}
        visible={confirm.visible}
        onConfirm={confirm.accept}
        onClose={() => setConfirm({ visible: false })}
      />
    </>
  );
}

export default DishIngredientAdd;
