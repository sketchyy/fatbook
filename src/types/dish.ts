import { Tables, TablesInsert, TablesUpdate } from "@/types/supabase.types";
import { DishPortion } from "@/types/dish-portion";
import { isNull } from "@/utils/is-null";

export type DishModel = Tables<"dishes">;

export type NewDish = TablesInsert<"dishes">;

export type UpdateDish = TablesUpdate<"dishes">;

export type Dish = Omit<Tables<"dishes">, "createdAt" | "updatedAt"> & {
  ingredients: DishPortion[];
};

export function mapDishToUi(dish: Dish | DishModel | null): Dish | null {
  if (isNull(dish)) {
    return null;
  }

  if (isWithIngredients(dish)) {
    return dish;
  }

  return {
    ...dish,
    ingredients: [],
  };
}

export function mapDishToDataModel(dish: Dish): UpdateDish {
  const { ingredients, ...rest } = dish;
  return rest;
}

export function hasIngredients() {}

function isWithIngredients(dish: DishModel | Dish | null): dish is Dish {
  return !!(dish as Dish)?.ingredients;
}
