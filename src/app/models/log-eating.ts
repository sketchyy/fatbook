import { Dish } from 'src/app/models/dish';
import { FoodValue } from './food-value';

export interface LogEating {
  id?: string;
  timestamp: number;
  dish: Dish;
  servingWeight: number;
  totals: FoodValue;
}
