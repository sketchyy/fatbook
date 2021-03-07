import { FoodValue } from './food-value';

export interface Ingredient {
  id?: string;
  name: string;
  foodValue: FoodValue;
  created?: number;
}
