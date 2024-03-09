import DishClass from "./DishClass";
import { NutritionFacts } from "./NutritionFacts";

export interface DishPortionOld {
  id: number;
  totalFoodValue: NutritionFacts;
  dish: DishClass;
  servingSize: number;
  selected: boolean;
}
