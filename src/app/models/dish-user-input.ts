import { IngredientRef } from './ingredient-ref';

export interface DishUserInput {
  name: string;
  ingredients: {
    ingredient: IngredientRef;
    weight: number;
  }[];
}
