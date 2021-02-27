import { DishIngredient } from './dish-ingredient';

export interface Dish {
  id?: string;
  name: string;
  ingredients: DishIngredient[];
  proteins?: number;
  fats?: number;
  carbs?: number;
  calories?: number;
}

