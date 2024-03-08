import { NutritionFacts } from "@/types/nutrition-facts";
import { DishPortion } from "@/shared/models/DishPortion";

export type Dish = {
  id: number;
  name: string;
  defaultPortion: number;
  cookedWeight: number;
  ingredients: DishPortion[];
  createdAt: string;
} & NutritionFacts;
