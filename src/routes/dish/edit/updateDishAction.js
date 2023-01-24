import { redirect } from "react-router-dom";
import dishesDbService from "../../../core/firebase/dishesDbService";

export default async function updateDishAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await dishesDbService.updateDish(params.id, updates);
  return redirect(`/dishes`);
}
