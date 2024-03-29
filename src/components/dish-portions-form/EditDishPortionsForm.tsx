import DishPortionList from "./dish-portion-list/DishPortionList";
import { DishPortion } from "@/types/dish-portion";

interface Props {
  dishPortions?: DishPortion[];
  onSave: (portion: DishPortion) => void;
  onDelete: (portion: DishPortion) => void;
}

function EditDishPortionsForm({ dishPortions, onSave, onDelete }: Props) {
  const handleSaveClick = (portion) => {
    onSave(portion);
  };

  const handleDeleteClick = (portion) => {
    onDelete(portion);
  };

  return (
    <DishPortionList
      dishPortions={dishPortions}
      onUpdate={handleSaveClick}
      onDelete={handleDeleteClick}
      isAdded={(p) => true}
    />
  );
}

export default EditDishPortionsForm;
