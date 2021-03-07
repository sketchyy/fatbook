import { FoodValue } from './food-value';

export interface LogEating {
  id?: string;
  timestamp: number;
  dishId: string;
  dishName: string;
  servingWeight: number;
  totals: FoodValue;
}
