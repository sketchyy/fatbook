import dishesService from "@/core/firebase/dishesService";
import Dish from "@/shared/models/Dish";
import { redirect } from "react-router-dom";

export default async function createDishAction() {
  let dishData = Dish.empty();

  const dish = await dishesService.createDish(dishData.toForm());
  return redirect(`/dishes/${dish.id}/edit`);
}
