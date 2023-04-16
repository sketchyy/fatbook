import Dish from "./Dish";
import { NutritionFacts } from "./NutritionFacts";

export interface DishPortion {
  id: string;
  totalFoodValue: NutritionFacts;
  dish: Dish;
  servingSize: number;
  selected: boolean;
}
