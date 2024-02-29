import Dish from "@/shared/models/Dish";
import dishesService from "@/core/firebase/dishesService";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const { data, error } = await dishesService.searchDishes(q);

  return {
    data: data!.map((d) => Dish.fromSupabase(d)),
    error,
    q,
  };
}
