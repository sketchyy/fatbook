export interface EditDishInput {
  name: string;
  "foodValue.proteins": number;
  "foodValue.fats": number;
  "foodValue.carbs": number;
  "foodValue.calories": number;
  defaultServingSize: number;
  createdAt?: number;
}
