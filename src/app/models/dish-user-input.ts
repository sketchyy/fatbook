import { DishIngredient } from './dish-ingredient';

export interface DishUserInput {
  name: string;
  dishIngredients: DishIngredient[];
  defaultServingSize: number;
}
