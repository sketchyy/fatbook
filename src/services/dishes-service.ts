import { supabase } from "@/utils/supabase";
import { DishInputs } from "@/routes/dish/edit/DishForm";
import dateService from "@/shared/services/dateService";
import { DishPortionOld } from "@/shared/models/DishPortionOld";
import { Dish } from "@/types/dish";
import { NutritionFacts } from "@/shared/models/NutritionFacts";
import foodValueService from "@/shared/services/foodValueService";
import { isNull } from "@/utils/is-null";

async function getDish(id: string | undefined): Promise<Dish | null> {
  if (isNull(id)) {
    // Placeholder data for create form
    return { name: "", ingredients: [] } as unknown as Dish;
  }

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
        defaultPortion,
        cookedWeight,
        createdAt,
        dishIngredients!public_dishIngredients_ingredient_fkey (
          id,
          proteins,
          fats,
          carbs,
          calories,
          portion,
          dishes!public_dishIngredients_dish_fkey (
            name
          )
        )  
     `,
    )
    .eq("id", id)
    .single();

  if (!data) {
    return null;
  }

  const { dishIngredients, ...rest } = data;
  const dish: Dish = { ...rest, ingredients: [] } as any; // REMOVE ANY AFTER NUTRITION FATCS REQUIRED IN DB

  dish.ingredients = dishIngredients.map((ingredient) => ({
    id: ingredient.id,
    dish: { name: ingredient.dishes?.name } as any,
    portion: ingredient.portion,
    proteins: ingredient.proteins,
    fats: ingredient.fats,
    carbs: ingredient.carbs,
    calories: ingredient.calories,
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

async function addIngredient(dish: Dish, ingredient: DishPortionOld) {
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

function calculateFoodValue(
  dish: Dish,
  cookedWeight?: number | null,
): NutritionFacts {
  if (dish.ingredients.length > 0) {
    return foodValueService.calculateDishValuePer100g(
      dish.ingredients,
      cookedWeight ?? dish.cookedWeight,
    );
  } else {
    return foodValueService.calculateOwnDishValuePer100g(
      dish,
      cookedWeight ?? dish.cookedWeight,
    );
  }
}

export default {
  getDish,
  searchDishes,
  createDish,
  updateDish,
  deleteDish,
  calculateFoodValue,
};
