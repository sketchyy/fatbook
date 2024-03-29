import SelectDishPortionsForm from "@/components/dish-portions-form/SelectDishPortionsForm";
import dateUtils from "@/utils/date-utils";
import { useParams } from "react-router-dom";
import { DishPortion } from "@/types/dish-portion";
import { useState } from "react";
import { useEatingMutations } from "@/hooks/use-eating-mutations";

function AddEatingForm() {
  const { day, meal } = useParams();
  const [selectedPortions, setSelectedPortions] = useState<DishPortion[]>([]);
  const { add, update, remove } = useEatingMutations(meal!);

  const handleAddEating = async (portion: DishPortion) => {
    add.mutate(portion, {
      onSuccess: (response) => {
        setSelectedPortions((portions) => [...portions, response]);
      },
    });
  };

  const handleUpdateEatings = async (portion: DishPortion) => {
    update.mutate(portion, {
      onSuccess: (response) => {
        setSelectedPortions((portions) =>
          portions.map((p) => (p.id === response.id ? response : p)),
        );
      },
    });
  };

  const handleDeleteEatings = async (portion: DishPortion) => {
    remove.mutate(portion, {
      onSuccess: () => {
        setSelectedPortions((portions) =>
          portions.filter((p) => p.id !== portion.id),
        );
      },
    });
  };

  const getSubtitle = () => {
    const today = dateUtils.now();
    if (dateUtils.isSame(day, today)) {
      return `${meal}, Today`;
    }

    const yesterday = dateUtils.subtractDays(today, 1);
    if (dateUtils.isSame(day, yesterday)) {
      return `${meal}, Yesterday`;
    }

    return `${meal}, ${day}`;
  };

  return (
    <SelectDishPortionsForm
      title="Select Dish"
      selectedPortions={selectedPortions}
      subtitle={getSubtitle()}
      onAdd={handleAddEating}
      onUpdate={handleUpdateEatings}
      onDelete={handleDeleteEatings}
    />
  );
}

export default AddEatingForm;
