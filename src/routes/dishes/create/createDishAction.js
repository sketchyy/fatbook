import { redirect } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";
import Dish from "../../../shared/models/Dish";

export default async function createDishAction() {
  let dishData = Dish.empty();

  const dishId = await dbService.createDish(dishData);
  return redirect(`/dishes/${dishId}/edit`);
}
