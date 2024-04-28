import SelectDishPortionsForm from "@/components/dish-portions-form/SelectDishPortionsForm";
import { isToday, isYesterday } from "@/utils/date-utils";
import { useParams } from "react-router-dom";
import { DishPortion } from "@/types/dish-portion";
import { useEatingMutations } from "@/hooks/use-eating-mutations";

function EatingsAdd() {
  const { day, meal } = useParams();
  const { add, update, remove, selectedPortions } = useEatingMutations(meal!);

  const handleAddEating = async (portion: DishPortion) => {
    add.mutate(portion);
  };

  const handleUpdateEatings = async (portion: DishPortion) => {
    update.mutate(portion);
  };

  const handleDeleteEatings = async (portion: DishPortion) => {
    remove.mutate(portion);
  };

  const getSubtitle = () => {
    if (isToday(day)) {
      return `${meal}, Today`;
    }

    if (isYesterday(day)) {
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

export default EatingsAdd;
