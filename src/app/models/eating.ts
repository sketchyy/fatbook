import { Dish } from './dish';

export interface Eating {
  time: Date;
  dishName: string;
  portionSize: number;
  fat: number;
  protein: number;
  carbohydrate: number;
  calories: number;
}
