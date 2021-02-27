import { DocumentReference } from '@angular/fire/firestore';

export interface DishDto {
  id?: string;
  name: string;
  ingredients: DishIngredientDto[];
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
}

export interface DishIngredientDto {
  ref: DocumentReference;
  weight: number;
}
