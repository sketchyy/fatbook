import { Dish } from "@/types/dish";
import { SimplifiedDish } from "@/types/dish-portion";

export function getDishIcon(dish?: Dish | SimplifiedDish) {
  if (!dish) {
    return "🥫";
  }

  if (dish.icon) {
    return dish.icon;
  }

  return dish.hasIngredients ? "🥘" : "🥫";
}
