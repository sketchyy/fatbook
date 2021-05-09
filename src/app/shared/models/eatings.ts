import { Dish } from 'src/app/shared/models/dishes';
import { FoodValue } from './food-value';

export interface LogDay {
  id?: string;
  timestamp: number;
  totals: FoodValue;
}

export interface Eating {
  id?: string;
  tmpDish?: boolean;
  timestamp: number;
  dish: Dish;
  servingSize: number;
  totals: FoodValue;
}

export interface EatingInput {
  dish: Dish;
  servingSize: number;
}

export interface EatingForm {
  tmpDish: boolean;
  tmpDishName: string;
  timestamp: number;
  eatings: EatingInput[];
}
