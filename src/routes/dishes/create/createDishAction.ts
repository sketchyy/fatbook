import { redirect } from "react-router-dom";
import dishesDbService from "../../../core/firebase/dishesDbService";
import Dish from "../../../shared/models/Dish";

export default async function createDishAction() {
  let dishData = Dish.empty();

  const dishId = await dishesDbService.createDish(dishData);
  return redirect(`/dishes/${dishId}/edit`);
}
