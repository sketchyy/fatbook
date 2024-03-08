import { NutritionFacts } from "@/types/nutrition-facts";
import { DishPortion } from "@/types/dish-portion";

export type Dish = {
  id: number;
  name: string;
  defaultPortion: number;
  cookedWeight: number;
  ingredients: DishPortion[];
  createdAt: string;
} & NutritionFacts;
