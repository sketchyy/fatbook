import dishesDbService from "../../core/firebase/dishesDbService";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const searchResult = await dishesDbService.searchDishes(q);
  return { searchResult, q };
}
