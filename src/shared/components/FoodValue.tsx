import { NutritionFacts } from "../models/NutritionFacts";
import foodValueService from "../services/foodValueService";

interface FoodValueProps {
  foodValue: NutritionFacts;
  className?: string;
}

function FoodValue({
  foodValue = foodValueService.emptyFoodValue(),
  className = "",
}: FoodValueProps) {
  const format = (val) => (val != null ? Math.round(val) : "n/a");

  return (
    <span className={"level " + className}>
      <span className="mr-2">⚡ {format(foodValue.calories)} kcal</span>
      <span className="mr-2">🥩 {format(foodValue.proteins)} g</span>
      <span className="mr-2">🧈 {format(foodValue.fats)} g</span>
      <span className="mr-2">🍚 {format(foodValue.carbs)} g</span>
    </span>
  );
}

export default FoodValue;
