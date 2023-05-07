import DishPortionList from "./dish-portion-list/DishPortionList";

function EditDishPortionsForm({ dishPortions, onSave, onDelete }) {
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
