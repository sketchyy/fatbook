import DishPortionList from "./dish-portion-list/DishPortionList";
import { DishPortionOld } from "@/shared/models/DishPortionOld";

interface Props {
  dishPortions: DishPortionOld[];
  onSave: (portion: DishPortionOld) => void;
  onDelete: (portion: DishPortionOld) => void;
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
