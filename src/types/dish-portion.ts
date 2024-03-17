import { Tables, TablesInsert, TablesUpdate } from "@/types/supabase.types";
import { Dish } from "@/types/dish";

/* Used for dish portions only */
type SimplifiedDish = Omit<
  Tables<"dishes">,
  "createdAt" | "updatedAt" | "cookedWeight"
>;

export type DishPortionInputs = {
  tempId?: string;
  proteins?: number;
  fats?: number;
  carbs?: number;
  calories?: number;
  portion?: number;
  dish: SimplifiedDish;
  selected: boolean;
};

export type DishPortion = Omit<
  Tables<"dishIngredients">,
  "dish" | "createdAt" | "parentDish"
> & {
  dish: SimplifiedDish;
};

export type DishPortionLight = Pick<
  Tables<"dishIngredients">,
  "proteins" | "fats" | "carbs" | "calories" | "portion"
>;

export function mapDishToPortionInputs(dish: Dish): DishPortionInputs {
  const { ingredients, ...simplifiedDish } = dish;
  return {
    selected: false,
    dish: simplifiedDish,
  };
}
