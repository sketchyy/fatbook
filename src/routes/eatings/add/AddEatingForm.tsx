import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import dateService from "@/shared/services/dateService";
import { useParams } from "react-router-dom";
import { DishPortion } from "@/types/dish-portion";
import { useState } from "react";
import { useEatingMutations } from "@/hooks/use-eating-mutations";

function AddEatingForm() {
  const { day, meal } = useParams();
  const [selectedPortions, setSelectedPortions] = useState<DishPortion[]>([]);
  const { addEating, updateEating, deleteEating } = useEatingMutations(meal!);

  const handleAddEating = async (portion: DishPortion) => {
    addEating.mutate(portion, {
      onSuccess: (response) => {
        setSelectedPortions((portions) => [...portions, response]);
      },
    });
  };

  const handleUpdateEatings = async (portion: DishPortion) => {
    updateEating.mutate(portion, {
      onSuccess: (response) => {
        setSelectedPortions((portions) =>
          portions.map((p) => (p.id === response.id ? response : p)),
        );
      },
    });
  };

  const handleDeleteEatings = async (portion: DishPortion) => {
    deleteEating.mutate(portion, {
      onSuccess: () => {
        setSelectedPortions((portions) =>
          portions.filter((p) => p.id !== portion.id),
        );
      },
    });
  };

  const getSubtitle = () => {
    const today = dateService.now();
    if (dateService.isSame(day, today)) {
      return `${meal}, Today`;
    }

    const yesterday = dateService.subtractDays(today, 1);
    if (dateService.isSame(day, yesterday)) {
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
