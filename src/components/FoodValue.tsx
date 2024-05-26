import { FoodValue as FoodValueType } from "@/types/food-value";
import { emptyFoodValue } from "@/utils/food-value-utils";
import { clsx } from "clsx";

type Props = {
  source?: FoodValueType | null;
  className?: string;
  isLoading?: boolean;
};

function FoodValue({ source, className = "", isLoading }: Props) {
  // TODO: single format func
  const format = (val: number) => (val != null ? Math.round(val) : "n/a");
  const rendered = source ?? emptyFoodValue();

  const cls = clsx("tag", {
    "is-skeleton": isLoading,
    "has-background-none px-0": !isLoading,
  });

  return (
    <span className={clsx("level", "is-mobile", "mb-0", className)}>
      <span className={cls}>⚡ {format(rendered.calories)} kcal</span>
      <span className={cls}>🥩 {format(rendered.proteins)} g</span>
      <span className={cls}>🧈 {format(rendered.fats)} g</span>
      <span className={cls}>🍚 {format(rendered.carbs)} g</span>
    </span>
  );
}

export default FoodValue;
