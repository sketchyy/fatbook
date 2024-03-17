import { supabase } from "@/utils/supabase";
import dateService from "@/shared/services/dateService";
import { Dish, mapDishToUi, NewDish, UpdateDish } from "@/types/dish";
import { isNull } from "@/utils/is-null";

async function getDish(id: number): Promise<Dish | null> {
  const { data: dish } = await supabase
    .from("dishes")
    .select(
      `
        id,
        name,
        proteins,
        fats,
        carbs,
        calories,
        defaultPortion,
        cookedWeight,
        ingredients:dishIngredients!public_dishIngredients_ingredient_fkey (
          *,
          dish:dishes!public_dishIngredients_dish_fkey (*)
        )  
     `,
    )
    .eq("id", id)
    .single();

  return mapDishToUi(dish);
}

async function searchDishes(query: string): Promise<Dish[]> {
  const { data } = await supabase
    .from("dishes")
    .select()
    .ilike("name", `%${query}%`)
    // TODO: research full text search with en/ru in supabase
    /*.textSearch("name", userQuery, {
          type: "plain",
          config: "english",
        })*/
    .order("updatedAt", { ascending: false });

  // All nulls are filtered
  return (data ?? [])
    .filter((d) => !isNull(d))
    .map((d) => mapDishToUi(d)) as Dish[];
}

async function createDish(dish: NewDish) {
  const { data } = await supabase.from("dishes").insert(dish).select();
  return data ? data[0] : null;
}

async function updateDish(id: number, dish: UpdateDish): Promise<Dish | null> {
  const { data } = await supabase
    .from("dishes")
    .update({
      ...dish,
      updatedAt: dateService.nowAsDate().toISOString(),
    })
    .eq("id", id)
    .select();

  return data ? mapDishToUi(data[0]) : null;
}

async function deleteDish(id: number) {
  return supabase.from("dishes").delete().eq("id", id);
}

export default {
  getDish,
  searchDishes,
  createDish,
  updateDish,
  deleteDish,
};
