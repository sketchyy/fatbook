import Dish from "./Dish";
import { NutritionFacts } from "./NutritionFacts";

export interface DishPortion {
  id: number;
  totalFoodValue: NutritionFacts;
  dish: Dish;
  servingSize: number;
  selected: boolean;
}
