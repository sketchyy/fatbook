import EditDishPortionsForm from "@/shared/components/dish-portions-form/EditDishPortionsForm";
import { DailyEatings } from "@/types/eating";
import { MealType } from "@/shared/models/Meals";
import { DishPortion } from "@/types/dish-portion";

type Props = {
  dailyEatings: DailyEatings;
  meal: MealType;
  handleDaySave: (meal: MealType, portion: DishPortion) => void;
  handleAddEatingDelete: (meal: MealType, portion: DishPortion) => void;
};
function MealContent({
  dailyEatings,
  meal,
  handleDaySave,
  handleAddEatingDelete,
}: Props) {
  const mealData = dailyEatings.meals[meal];

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
