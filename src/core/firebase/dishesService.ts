// Import the functions you need from the SDKs you need
import Dish from "@/shared/models/Dish";
import dateService from "@/shared/services/dateService";
import { collection, deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebaseApp from "./firebaseApp";
import { supabase } from "@/utils/supabase";
import { DishInputs } from "@/routes/dish/edit/EditDish";
import { DishPortion } from "@/shared/models/DishPortion";

const db = getFirestore(firebaseApp);
const dishesRef = collection(db, "dishes"); /*.withConverter(dishConverter)*/
const dishesSearchIndexRef = collection(db, "dishes-search-index");

const dishesService = {
  async getDish(id: number): Promise<Dish> {
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
  },

  async searchDishes(userQuery: string) {
    return (
      supabase
        .from("dishes")
        .select()
        .ilike("name", `%${userQuery}%`)
        // TODO: research full text search with en/ru in supabase
        /*.textSearch("name", userQuery, {
        type: "plain",
        config: "english",
      })*/
        .order("updatedAt", { ascending: false })
    );
  },

  async createDish(dish: DishInputs) {
    await supabase.from("dishes").insert(dish);
  },

  async updateDish(id: number, dish: DishInputs) {
    const { error } = await supabase
      .from("dishes")
      .update({
        ...dish,
        updatedAt: dateService.nowAsDate().toISOString(),
      })
      .eq("id", id);
  },

  async addIngredient(dish: Dish, ingredient: DishPortion) {
    await this.updateDish(dish.id!, dish.toForm());

    return supabase.from("dishIngredients").insert({
      portionSize: ingredient.servingSize,
      proteins: ingredient.totalFoodValue.proteins,
      fats: ingredient.totalFoodValue.fats,
      carbs: ingredient.totalFoodValue.carbs,
      calories: ingredient.totalFoodValue.calories,
      dish: ingredient.dish.id!,
      parentDish: dish.id!,
    });
  },

  async replaceDish(dish: Dish) {
    await supabase.from("dishIngredients").insert([]);
  },

  async deleteDish(id) {
    return Promise.all([
      await deleteDoc(doc(dishesRef, id)),
      await deleteDoc(doc(dishesSearchIndexRef, id)),
    ]);
  },
};

export default dishesService;
