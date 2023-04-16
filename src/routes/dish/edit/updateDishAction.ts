import dishesService from "@/core/firebase/dishesService";
import { redirect } from "react-router-dom";

export default async function updateDishAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await dishesService.updateDish(params.id, updates);
  return redirect(`/dishes`);
}
