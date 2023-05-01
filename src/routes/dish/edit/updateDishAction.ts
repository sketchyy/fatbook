import dishesService from "@/core/firebase/dishesService";
import { DishFormData } from "@/shared/models/DishFormData";
import { redirect } from "react-router-dom";

export default async function updateDishAction({ request, params }) {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);

  // Form data only contains Strings, but we want numbers in DB
  const updates: DishFormData = {
    name: formObject.name,
    defaultServingSize: Number(formObject.defaultServingSize),
    "foodValue.proteins": Number(formObject["foodValue.proteins"]),
    "foodValue.fats": Number(formObject["foodValue.fats"]),
    "foodValue.carbs": Number(formObject["foodValue.carbs"]),
    "foodValue.calories": Number(formObject["foodValue.calories"]),
  };

  await dishesService.updateDish(params.id, updates);
  return redirect(`/dishes`);
}
