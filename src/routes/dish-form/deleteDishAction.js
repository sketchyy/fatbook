import { redirect } from "react-router-dom";
import dbService from "../../core/firebase/dbService";

export async function deleteDishAction({ params }) {
  console.log("deleteDishAction id=", params.id);
  await dbService.deleteDish(params.id);
  return redirect("/dishes");
}
