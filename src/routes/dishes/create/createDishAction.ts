import dishesServiceOld from "@/core/firebase/dishesServiceOld";
import DishClass from "@/shared/models/DishClass";
import { redirect } from "react-router-dom";

export default async function createDishAction() {
  let dishData = DishClass.empty();

  const dish = await dishesServiceOld.createDish(dishData.toForm());
  return redirect(`/dishes/${dish.id}/edit`);
}
