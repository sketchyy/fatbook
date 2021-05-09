import { EatingInput } from './eatings';
import { FoodValue } from './food-value';

export interface Dish {
  id?: string;
  name: string;
  createdAt: number;
  foodValue: FoodValue;
  ingredients?: EatingInput[];
  defaultServingSize?: number;
}

export enum DishDialogMode {
  Edit,
  Create
}
