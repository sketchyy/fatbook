import dbService from "../../core/firebase/dbService";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const searchResult = await dbService.searchDishes(q);
  return { searchResult, q };
}
