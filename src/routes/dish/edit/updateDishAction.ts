import dishesService from "@/core/firebase/dishesService";
import { redirect } from "react-router-dom";

export default async function updateDishAction({ request, params }) {
  const formData = await request.formData();
  const formObject = Object.fromEntries(formData);

  // Form data only contains Strings, but we want numbers in DB
  Object.keys(formObject)
    .filter((key) => key !== "name")
    .forEach((key) => {
      formObject[key] = Number(formObject[key]);
    });

  await dishesService.updateDish(params.id, formObject);
  return redirect(`/dishes`);
}
