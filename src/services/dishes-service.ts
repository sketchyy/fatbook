import { supabase } from "@/services/supabase";
import { nowAsDate } from "@/utils/date-utils";
import { Dish, DishModel } from "@/types/dish";
import { isNil } from "@/utils/is-nil";
import { DishPortion } from "@/types/dish-portion";
import { TablesInsert, TablesUpdate } from "@/types/supabase.types";

export async function fetchDish(id: number): Promise<Dish | null> {
  const { data: dish } = await supabase
    .from("dishes")
    .select(
      `
        id,
        name,
        icon,
        proteins,
        fats,
        carbs,
        calories,
        defaultPortion,
        hasIngredients,
        cookedWeight,
        updatedAt,
        createdAt,
        ingredients!public_dishIngredients_ingredient_fkey (
          *,
          dish:dishes!public_dishIngredients_dish_fkey (*)
        )  
     `,
    )
    .eq("id", id)
    .eq("deleted", false)
    .single();

  return mapDishToUi(dish);
}

type SearchProps = {
  query: string;
  filterDishId?: number;
  filterEmpty?: boolean;
  page: number;
};

export const PAGE_SIZE = 25;

export async function searchDishes({
  query,
  filterDishId,
  filterEmpty,
  page,
}: SearchProps): Promise<Dish[]> {
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  let dbQuery = supabase
    .from("dishes")
    .select()
    .is("deleted", false)
    .range(from, to)
    .order("updatedAt", { ascending: false })
    .order("id", { ascending: true })
    .throwOnError();

  if (query) {
    dbQuery = dbQuery.ilike("name", `%${query.trim()}%`);
    // * Below is the implementation of full text search
    // * The limitation is that it only search by full words
    // const tsQuery = query.includes(" ") ? query : query + ":*";
    // dbQuery = dbQuery
    //   .textSearch("searchable", tsQuery, {
    //     type: "websearch",
    //     config: "russian",
    //   })
    //   .textSearch("searchable", tsQuery, {
    //     type: "websearch",
    //     config: "english",
    //   });
  }

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

/* Delete will only mark dish as `deleted`.
 * It will be hidden from search, but remain referenced by Eatings/DishIngredients.
 * Housekeeping procedure will delete `deleted` dishes each month, if there are no references left.
 * */
export async function deleteDish(id: number) {
  return supabase.from("dishes").update({ deleted: true }).eq("id", id);
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
