import { DishIngredientDto } from './dish-dto';

export interface DishDto {
  id?: string;
  name: string;
  ingredients: DishIngredientDto[];
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
}
