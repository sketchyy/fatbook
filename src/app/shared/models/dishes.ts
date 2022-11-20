import { EatingInput } from './eatings';
import { FoodValue } from './food-value';

export interface Dish {
  id?: string;
  name: string;
  createdAt: number;
  foodValue: FoodValue;
  ingredients?: EatingInput[];
  defaultServingSize?: number;
  searchIndex?: string[];
}

export enum DishDialogMode {
  Edit,
  Create,
}
