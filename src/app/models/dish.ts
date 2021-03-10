import { Ingredient } from 'src/app/models/ingredient';
import { FoodValue } from './food-value';

export interface Dish {
  id?: string;
  name: string;
  createdAt: number;
  foodValue: FoodValue;
  ingredients?: Ingredient[];
  defaultServingSize?: number;
}

