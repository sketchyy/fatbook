import DishPortionsList from "./DishPortionsList";

function EditDishPortionsForm({ dishPortions, onSave, onDelete }) {
  const handleSaveClick = (portion) => {
    onSave(portion);
  };

  const handleDeleteClick = (portion) => {
    onDelete(portion);
  };

  return (
    <DishPortionsList
      dishPortions={dishPortions}
      onUpdate={handleSaveClick}
      onDelete={handleDeleteClick}
      isAdded={(p) => true}
    />
  );
}

export default EditDishPortionsForm;
