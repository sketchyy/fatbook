import { IngredientSelectItem } from './ingredient-select-item';

export interface Dish {
  id?: string;
  name: string;
  ingredients: IngredientSelectItem[];
  fat?: number;
  protein?: number;
  carbohydrate?: number;
  calories?: number;
}
