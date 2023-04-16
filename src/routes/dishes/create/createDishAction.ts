import { redirect } from "react-router-dom";
import dishesService from "../../../core/firebase/dishesService";
import Dish from "../../../shared/models/Dish";

export default async function createDishAction() {
  let dishData = Dish.empty();

  const dishId = await dishesService.createDish(dishData);
  return redirect(`/dishes/${dishId}/edit`);
}
