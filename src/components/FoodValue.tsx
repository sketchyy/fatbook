import { FoodValue as FoodValueType } from "@/types/food-value";
import { emptyFoodValue } from "@/utils/food-value-utils";
import { clsx } from "clsx";
import { Level } from "@/components/ui/Level";
import { useIsTouchDevice } from "@/hooks/use-is-touch-device";

type Props = {
  source?: FoodValueType | null;
  className?: string;
  isLoading?: boolean;
};

function FoodValue({ source, className = "", isLoading }: Props) {
  // TODO: single format func
  const format = (val: number) => (val != null ? Math.round(val) : "n/a");
  const rendered = source ?? emptyFoodValue();
  const isTouchDevice = useIsTouchDevice();

  const cls = clsx("tag", {
    "is-skeleton px-1": isLoading,
    "has-background-none px-0": !isLoading,
    "is-unselectable": isTouchDevice,
  });

  return (
    <Level className={clsx("mb-0", className)}>
      <span className={cls}>⚡ {format(rendered.calories)} kcal</span>
      <span className={cls}>🥩 {format(rendered.proteins)} g</span>
      <span className={cls}>🧈 {format(rendered.fats)} g</span>
      <span className={cls}>🍚 {format(rendered.carbs)} g</span>
    </Level>
  );
}

export default FoodValue;
