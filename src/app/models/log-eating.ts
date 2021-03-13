import { Dish } from 'src/app/models/dish';
import { FoodValue } from './food-value';

export interface Eating {
  id?: string;
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
  timestamp: number;
  eatings: EatingInput[];
}
