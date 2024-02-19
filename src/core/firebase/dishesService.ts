// Import the functions you need from the SDKs you need
import Dish, { dishConverter } from "@/shared/models/Dish";
import dateService from "@/shared/services/dateService";
import tokenize from "@/shared/utils/tokenize";
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";
import { supabase } from "@/utils/supabase";
import { DishInputs } from "@/routes/dish/edit/EditDish";

const db = getFirestore(firebaseApp);
const dishesRef = collection(db, "dishes"); /*.withConverter(dishConverter)*/
const dishesSearchIndexRef = collection(db, "dishes-search-index");

// Dishes
const dishesService = {
  async getDish(id: number): Promise<Dish> {
    const { data } = await supabase
      .from("dishes")
      .select()
      .eq("id", id)
      .single();
    return Dish.fromSupabase(data!) ?? Dish.empty();
  },

  async searchDishes(userQuery: string) {
    return (
      supabase
        .from("dishes")
        .select()
        .ilike("name", `%${userQuery}%`)
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

  async updateDish(id: string, dish: DishInputs) {
    const { error } = await supabase
      .from("dishes")
      .update({
        ...dish,
        updatedAt: dateService.nowAsDate().toISOString(),
      })
      .eq("id", id);
  },

  async replaceDish(dish) {
    console.log("Replacing dish...", dish);
    dish.createdAt = dateService.now(); //TODO: updatedAt || usedAt

    const docRef = doc(dishesRef, dish.id);
    setDoc(docRef, dish);

    await updateDishSearchIndex(docRef.id, dish.name);
  },

  async deleteDish(id) {
    return Promise.all([
      await deleteDoc(doc(dishesRef, id)),
      await deleteDoc(doc(dishesSearchIndexRef, id)),
    ]);
  },
};

async function updateDishSearchIndex(id, name) {
  const searchIndex = {
    index: name ? tokenize(name) : [],
  };
  const indexDocRef = doc(dishesSearchIndexRef, id);
  await setDoc(indexDocRef, searchIndex);
  console.log("Dish index added...", id, searchIndex);
}

function prepareSearchQuery(query) {
  return query.toLowerCase().trim().replace(" ", "__");
}

export default dishesService;
