import DishClass from "./DishClass";
import { NutritionFacts } from "./NutritionFacts";

export interface DishPortion {
  id: number;
  totalFoodValue: NutritionFacts;
  dish: DishClass;
  servingSize: number;
  selected: boolean;
}
