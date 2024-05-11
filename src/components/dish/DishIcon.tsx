import { Dish } from "@/types/dish";
import { clsx } from "clsx";
import { SimplifiedDish } from "@/types/dish-portion";

type Props = {
  dish: Dish | SimplifiedDish;
  className: string;
};

function DishIcon({ dish, className }: Props) {
  return <span className={clsx("is-size-4", className)}>{dish.icon}</span>;
}

export default DishIcon;
