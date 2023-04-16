import dishesService from "@/core/firebase/dishesService";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const searchResult = await dishesService.searchDishes(q);
  return { searchResult, q };
}
