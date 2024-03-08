import Dish from "@/shared/models/Dish";
import { supabase } from "@/utils/supabase";
import { DishInputs } from "@/routes/dish/edit/EditDish";
import dateService from "@/shared/services/dateService";
import { DishPortion } from "@/shared/models/DishPortion";

async function getDish(id: number): Promise<Dish> {
  const { data } = await supabase
    .from("dishes")
    .select(
      `
        id,
        name,
        proteins,
        fats,
        carbs,
        calories,
        portionSize,
        cookedWeight,
        createdAt,
        dishIngredients!public_dishIngredients_ingredient_fkey (
          id,
          proteins,
          fats,
          carbs,
          calories,
          portionSize,
          dishes!public_dishIngredients_dish_fkey (
            name
          )
        )  
     `,
    )
    .eq("id", id)
    .single();

  const dish = Dish.fromSupabase(data! as any) ?? Dish.empty();

  dish.ingredients = data!.dishIngredients.map((r) => ({
    totalFoodValue: {
      proteins: r.proteins,
      fats: r.fats,
      carbs: r.carbs,
      calories: r.calories,
    },
    dish: { name: r.dishes?.name } as any,
    servingSize: r.portionSize!,
    id: r.id,
    selected: false,
  }));

  return dish;
}

/* = "" default? */
async function searchDishes(query: string) {
  return (
    supabase
      .from("dishes")
      .select()
      .ilike("name", `%${query}%`)
      // TODO: research full text search with en/ru in supabase
      /*.textSearch("name", userQuery, {
        type: "plain",
        config: "english",
      })*/
      .order("updatedAt", { ascending: false })
      .then((result) => result.data)
  );
}

async function createDish(dish: DishInputs) {
  const { data } = await supabase.from("dishes").insert(dish).select();
  return data![0];
}

async function updateDish(id: number, dish: DishInputs) {
  const { error } = await supabase
    .from("dishes")
    .update({
      ...dish,
      updatedAt: dateService.nowAsDate().toISOString(),
    })
    .eq("id", id);
}

async function addIngredient(dish: Dish, ingredient: DishPortion) {
  await updateDish(dish.id!, dish.toForm());

  return supabase.from("dishIngredients").insert({
    portionSize: ingredient.servingSize,
    proteins: ingredient.totalFoodValue.proteins,
    fats: ingredient.totalFoodValue.fats,
    carbs: ingredient.totalFoodValue.carbs,
    calories: ingredient.totalFoodValue.calories,
    dish: ingredient.dish.id!,
    parentDish: dish.id!,
  });
}

async function replaceDish(dish: Dish) {
  await supabase.from("dishIngredients").insert([]);
}

async function deleteDish(id: number) {
  return supabase.from("dishes").delete().eq("id", id);
}

export default {
  getDish,
  searchDishes,
  deleteDish,
};
