import { DishPortion } from "@/types/dish-portion";

export type Dish = {
  id: number;
  name: string;
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
  cookedWeight?: number | null;
  defaultPortion?: number | null;
  ingredients: DishPortion[];
};
