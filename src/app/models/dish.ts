import { Ingredient } from 'src/app/models/ingredient';
import { FoodValue } from './food-value';

export interface Dish {
  id?: string;
  name: string;
  totals: FoodValue;
  ingredients: Ingredient[];
}

