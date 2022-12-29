import { redirect } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";

export default async function updateDishAction({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  await dbService.updateDish(params.id, updates);
  return redirect(`/dishes`);
}
