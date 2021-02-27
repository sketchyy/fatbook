import { Ingredient } from './ingredient';

export interface Dish {
  id?: string;
  name: string;
  ingredients: DishIngredient[];
  proteins?: number;
  fats?: number;
  carbs?: number;
  calories?: number;
}

export interface DishIngredient {
  ingredient: Ingredient;
  weight: number;
}
