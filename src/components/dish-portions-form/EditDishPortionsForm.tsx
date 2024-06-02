import DishPortionList from "./dish-portion-list/DishPortionList";
import { DishPortion } from "@/types/dish-portion";

interface Props {
  dishPortions?: DishPortion[];
  onSave: (portion: DishPortion) => void;
  onDelete: (portion: DishPortion) => void;
  isLoading?: boolean;
}

function EditDishPortionsForm({
  dishPortions,
  onSave,
  onDelete,
  isLoading,
}: Props) {
  const handleSaveClick = (portion) => {
    onSave(portion);
  };

  const handleDeleteClick = (portion) => {
    onDelete(portion);
  };

  return (
    <DishPortionList
      isLoading={isLoading}
      dishPortions={dishPortions}
      onUpdate={handleSaveClick}
      onDelete={handleDeleteClick}
      isAdded={(p) => true}
    />
  );
}

export default EditDishPortionsForm;
