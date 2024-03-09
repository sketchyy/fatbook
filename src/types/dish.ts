import { NutritionFacts } from "@/types/nutrition-facts";
import { DishPortion } from "@/types/dish-portion";

export type Dish = {
  id: number;
  name: string;
  ingredients: DishPortion[];
  createdAt: string;
  defaultPortion: number | null;
  cookedWeight: number | null;
} & NutritionFacts;
