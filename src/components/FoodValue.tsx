import { FoodValue as FoodValueType } from "@/types/food-value";
import { emptyFoodValue } from "@/utils/food-value-utils";
import { clsx } from "clsx";

type Props = {
  source: FoodValueType;
  className?: string;
};

function FoodValue({ source = emptyFoodValue(), className = "" }: Props) {
  // TODO: single format func
  const format = (val: number) => (val != null ? Math.round(val) : "n/a");

  return (
    <span className={clsx("level", "mb-0", className)}>
      <span className="mr-2">⚡ {format(source.calories)} kcal</span>
      <span className="mr-2">🥩 {format(source.proteins)} g</span>
      <span className="mr-2">🧈 {format(source.fats)} g</span>
      <span className="mr-2">🍚 {format(source.carbs)} g</span>
    </span>
  );
}

export default FoodValue;
