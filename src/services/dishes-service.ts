import { supabase } from "@/services/supabase";
import { nowAsDate } from "@/utils/date-utils";
import { Dish } from "@/types/dish";
import { isNil } from "@/utils/is-nil";
import { DishPortion } from "@/types/dish-portion";
import { Tables, TablesInsert, TablesUpdate } from "@/types/supabase.types";

type DishModel = Omit<Tables<"dishes">, "createdAt" | "updatedAt"> & {
  ingredients?: Tables<"ingredients">[];
};

export async function fetchDish(id: number): Promise<Dish | null> {
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

type SearchProps = {
  query: string;
  filterDishId?: number;
  filterEmpty?: boolean;
};
export async function searchDishes({
  query,
  filterDishId,
  filterEmpty,
}: SearchProps): Promise<Dish[]> {
  let dbQuery = supabase
    .from("dishes")
    .select()
    .ilike("name", `%${query}%`)

    // TODO: research full text search with en/ru in supabase
    /*.textSearch("name", userQuery, {
          type: "plain",
          config: "english",
        })*/
    .order("updatedAt", { ascending: false });

  if (filterEmpty) {
    dbQuery = dbQuery
      .not("proteins", "is", null)
      .not("fats", "is", null)
      .not("carbs", "is", null)
      .not("calories", "is", null);
  }

  if (filterDishId) {
    dbQuery = dbQuery.not("id", "eq", filterDishId);
  }

  const { data } = await dbQuery;

  // All nulls are filtered
  return (data ?? [])
    .filter((d) => !isNil(d))
    .map((d) => mapDishToUi(d)) as Dish[];
}

export async function createDish(dish: TablesInsert<"dishes">) {
  const { data } = await supabase.from("dishes").insert(dish).select();
  return data ? data[0] : null;
}

export async function updateDish(
  id: number,
  dish: TablesUpdate<"dishes">,
): Promise<Dish | null> {
  const { data } = await supabase
    .from("dishes")
    .update({
      ...dish,
      updatedAt: nowAsDate().toISOString(),
    })
    .eq("id", id)
    .select();

  return data ? mapDishToUi(data[0]) : null;
}

export async function deleteDish(id: number) {
  return supabase.from("dishes").delete().eq("id", id);
}

function mapDishToUi(dish: DishModel | null): Dish | null {
  if (isNil(dish)) {
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
