import { FoodValue } from './food-value';

export interface LogDay {
  id: string;
  timestamp: number;
  totals: FoodValue;
}
