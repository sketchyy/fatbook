import { redirect } from "react-router-dom";
import dishesDbService from "../../../core/firebase/dishesDbService";

export default async function deleteDishAction({ params }) {
  console.log("deleteDishAction id=", params.id);
  await dishesDbService.deleteDish(params.id);
  return redirect("/dishes");
}
