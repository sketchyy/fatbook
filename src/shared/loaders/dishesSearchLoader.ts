import { supabase } from "@/utils/supabase";
import Dish from "@/shared/models/Dish";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const { data, error } = await supabase
    .from("dishes")
    .select()
    .order("updatedAt", { ascending: false });

  return {
    data: data!.map((d) => Dish.fromSupabase(d)),
    error,
    q,
  };
}
