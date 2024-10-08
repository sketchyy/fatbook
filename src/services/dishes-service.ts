import { supabase } from "@/services/supabase";
import { nowAsDate } from "@/utils/date-utils";
import { Dish, DishModel } from "@/types/dish";
import { isNil } from "@/utils/is-nil";
import { DishPortion } from "@/types/dish-portion";
import { TablesInsert, TablesUpdate } from "@/types/supabase.types";
import { ingredientsService } from "@/services/ingredients-service";

type SearchProps = {
  query: string;
  collectionId: number | null;
  filterDishId?: number;
  filterEmpty?: boolean;
  page: number;
};

export const PAGE_SIZE = 25;
const SHARED_COLLECTION_ID = 1;

class DishesService {
  async fetchDish(id: number): Promise<Dish | null> {
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
        collectionId,
        ingredients!public_dishIngredients_ingredient_fkey (
          *,
          dish:dishes!public_dishIngredients_dish_fkey (*)
        )  
     `,
      )
      .eq("id", id)
      .eq("deleted", false)
      .single();

    return this.mapDishToUi(dish);
  }

  async searchDishes({
    query,
    filterDishId,
    filterEmpty,
    collectionId,
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

    // All users can see SHARED dishes
    const collections = [SHARED_COLLECTION_ID];
    if (collectionId !== null) {
      collections.push(collectionId);
    }
    dbQuery = dbQuery.in("collectionId", collections);

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
      .map((d) => this.mapDishToUi(d)) as Dish[];
  }

  async createDish(dish: TablesInsert<"dishes">): Promise<Dish | null> {
    const { data } = await supabase.from("dishes").insert(dish).select();
    return data && data[0] ? this.mapDishToUi(data[0]) : null;
  }

  async copyDish(originalDish: Dish, collectionId: number | null) {
    const newDish = await this.createDish({
      name: originalDish.name + " (Copy)",
      proteins: originalDish.proteins,
      fats: originalDish.fats,
      carbs: originalDish.carbs,
      calories: originalDish.calories,
      defaultPortion: originalDish.defaultPortion,
      collectionId: collectionId ?? SHARED_COLLECTION_ID,
      icon: originalDish.icon,
      hasIngredients: originalDish.hasIngredients,
    });

    if (
      newDish &&
      originalDish.hasIngredients &&
      originalDish.ingredients.length > 0
    ) {
      originalDish.ingredients.forEach((ingredient) => {
        ingredientsService.addIngredient(newDish, ingredient);
      });
    }

    return newDish;
  }

  async updateDish(
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

    return data ? this.mapDishToUi(data[0]) : null;
  }

  /* Delete will only mark dish as `deleted`.
   * It will be hidden from search, but remain referenced by Eatings/DishIngredients.
   * Housekeeping procedure will delete `deleted` dishes each month, if there are no references left.
   * */
  async deleteDish(id: number) {
    return supabase.from("dishes").update({ deleted: true }).eq("id", id);
  }

  private mapDishToUi(dish: DishModel | null): Dish | null {
    if (isNil(dish)) {
      return null;
    }

    if (this.isWithIngredients(dish)) {
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

  private isWithIngredients(dish: DishModel | Dish | null): dish is Dish {
    return !!(dish as Dish)?.ingredients;
  }
}

export const dishesService = new DishesService();
