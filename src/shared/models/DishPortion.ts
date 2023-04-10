import Dish from "./Dish";
import { FoodValue } from "./FoodValue";

export interface DishPortion {
  id: string;
  totalFoodValue: FoodValue;
  dish: Dish;
  servingSize: number;
  selected: boolean;
}
