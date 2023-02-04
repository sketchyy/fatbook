import React from "react";
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
      onSubmit={handleSaveClick}
      onDelete={handleDeleteClick}
      isSubmitVisible={(p) => true}
      isDeleteVisible={(p) => true}
    />
  );
}

export default EditDishPortionsForm;
