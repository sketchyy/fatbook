import { NutritionFacts } from "../models/NutritionFacts";
import foodValueService from "../services/foodValueService";

type Props = NutritionFacts & {
  foodValue?: NutritionFacts;
  className?: string;
};

function FoodValue({
  proteins,
  fats,
  carbs,
  calories,
  foodValue = foodValueService.emptyFoodValue(),
  className = "",
}: Props) {
  // TODO: single format func
  const format = (val: number) => (val != null ? Math.round(val) : "n/a");

  return (
    <span className={"level " + className}>
      <span className="mr-2">⚡ {format(calories)} kcal</span>
      <span className="mr-2">🥩 {format(proteins)} g</span>
      <span className="mr-2">🧈 {format(fats)} g</span>
      <span className="mr-2">🍚 {format(carbs)} g</span>
    </span>
  );
}

export default FoodValue;
