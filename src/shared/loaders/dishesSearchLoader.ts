import dishesService from "@/services/dishes-service";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const { data, error } = await dishesService.searchDishes(q);

  return {
    data,
    error,
    q,
  };
}
