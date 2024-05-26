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
    <span className={clsx("level", "is-mobile", "mb-0", className)}>
      <span>⚡ {format(source.calories)} kcal</span>
      <span>🥩 {format(source.proteins)} g</span>
      <span>🧈 {format(source.fats)} g</span>
      <span>🍚 {format(source.carbs)} g</span>
    </span>
  );
}

export default FoodValue;
