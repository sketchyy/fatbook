import { DishPortion } from "@/types/dish-portion";
import { Tables } from "@/types/supabase.types";

export type Dish = {
  id: number;
  name: string;
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
  cookedWeight?: number | null;
  defaultPortion: number | null;
  hasIngredients: boolean;
  ingredients: DishPortion[];
  updatedAt: string;
};

/* DB model - internal fields */
export type DishModel = Omit<
  Tables<"dishes">,
  "createdAt" | "deleted" | "legacyId" | "searchable" | "test"
> & {
  ingredients?: Tables<"ingredients">[];
};
