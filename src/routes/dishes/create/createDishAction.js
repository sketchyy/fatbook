import { redirect } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";

export default async function createDishAction() {
  let dishData = {
    name: "",
    foodValue: {
      carbs: "",
      proteins: "",
      calories: "",
      fats: "",
    },
    defaultServingSize: "",
    ingredients: [],
  };

  const dishId = await dbService.createDish(dishData);
  return redirect(`/dishes/${dishId}/edit`);
}
