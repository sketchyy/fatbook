import { supabase } from "@/services/supabase";
import dateUtils from "@/utils/date-utils";
import { Dish } from "@/types/dish";
import { isNull } from "@/utils/is-null";
import { DishPortion } from "@/types/dish-portion";
import { Tables, TablesInsert, TablesUpdate } from "@/types/supabase.types";

type DishModel = Omit<Tables<"dishes">, "createdAt" | "updatedAt"> & {
  ingredients?: Tables<"ingredients">[];
};

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
        hasIngredients,
        cookedWeight,
        ingredients!public_dishIngredients_ingredient_fkey (
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

async function createDish(dish: TablesInsert<"dishes">) {
  const { data } = await supabase.from("dishes").insert(dish).select();
  return data ? data[0] : null;
}

async function updateDish(
  id: number,
  dish: TablesUpdate<"dishes">,
): Promise<Dish | null> {
  const { data } = await supabase
    .from("dishes")
    .update({
      ...dish,
      updatedAt: dateUtils.nowAsDate().toISOString(),
    })
    .eq("id", id)
    .select();

  return data ? mapDishToUi(data[0]) : null;
}

async function deleteDish(id: number) {
  return supabase.from("dishes").delete().eq("id", id);
}

function mapDishToUi(dish: DishModel | null): Dish | null {
  if (isNull(dish)) {
    return null;
  }

  if (isWithIngredients(dish)) {
    dish.ingredients.sort(
      (a: DishPortion, b: DishPortion) =>
        a.dish.name?.localeCompare(b.dish.name!) ?? 0,
    );
    return dish;
  }

  return {
    ...(dish as any),
    ingredients: [],
  };
}

function isWithIngredients(dish: DishModel | Dish | null): dish is Dish {
  return !!(dish as Dish)?.ingredients;
}

export default {
  getDish,
  searchDishes,
  createDish,
  updateDish,
  deleteDish,
};
