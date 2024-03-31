import { Tables } from "@/types/supabase.types";

/* Used for dish portions only */
export type SimplifiedDish = Omit<
  Tables<"dishes">,
  "createdAt" | "updatedAt" | "cookedWeight"
>;

export type DishPortion = {
  id?: number;
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
  portion?: number;
  dish: SimplifiedDish;
  selected?: boolean;
};
