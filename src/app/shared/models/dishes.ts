import { FoodValue } from './food-value';

export interface Dish {
  id?: string;
  name: string;
  createdAt: number;
  foodValue: FoodValue;
  ingredients?: Dish[];
  defaultServingSize?: number;
}

export enum DishDialogMode {
  Edit,
  Create
}
