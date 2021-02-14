import { Dish } from './dish';

export interface Eating {
  id?: string;
  time: Date;
  dishName: string;
  portionSize: number;
  fat: number;
  protein: number;
  carbohydrate: number;
  calories: number;
}
