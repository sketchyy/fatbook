import dishesService from "@/core/firebase/dishesService";
import { redirect } from "react-router-dom";

export default async function deleteDishAction({ params }) {
  console.log("deleteDishAction id=", params.id);
  await dishesService.deleteDish(params.id);
  return redirect("/dishes");
}
