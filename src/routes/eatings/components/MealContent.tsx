import EditDishPortionsForm from "@/shared/components/dish-portions-form/EditDishPortionsForm";

function MealContent({ logDay, meal, handleDaySave, handleAddEatingDelete }) {
  const mealData = logDay.meals[meal];

  return (
    <div className="mt-3">
      <EditDishPortionsForm
        dishPortions={mealData.eatings}
        onSave={(portion) => handleDaySave(meal, portion)}
        onDelete={(portion) => handleAddEatingDelete(meal, portion)}
      />
    </div>
  );
}

export default MealContent;
