// Import the functions you need from the SDKs you need
import {dishConverter} from "@/shared/models/Dish";
import dateService from "@/shared/services/dateService";
import tokenize from "@/shared/utils/tokenize";
import {
  addDoc,
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
  updateDoc,
  where,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);
const dishesRef = collection(db, "dishes").withConverter(dishConverter);
const dishesSearchIndexRef = collection(db, "dishes-search-index");

// Dishes
const dishesService = {
  async getDishes() {
    const querySnapshot = await getDocs(
      query(dishesRef, orderBy("createdAt", "desc"), limit(50))
    );

    return querySnapshot.docs.map((doc) => doc.data());
  },

  subscribeToDishChanges(id, onNext) {
    const unsubscribe = onSnapshot(doc(dishesRef, id), (doc) =>
      onNext(doc.data())
    );

    return unsubscribe;
  },

  async getDish(id) {
    const docSnap = await getDoc(doc(dishesRef, id));

    return docSnap.data();
  },

  async searchDishes(userQuery) {
    if (!userQuery) {
      return this.getDishes();
    }
    const searchToken = prepareSearchQuery(userQuery);

    const ids = (
      await getDocs(
        query(
          dishesSearchIndexRef,
          where("index", "array-contains", searchToken),
          limit(10)
        )
      )
    ).docs.map((doc) => doc.id);

    if (ids.length === 0) {
      return [];
    }

    return (
      await getDocs(query(dishesRef, where(documentId(), "in", ids)))
    ).docs.map((doc) => doc.data());
  },

  async createDish(dish) {
    dish.createdAt = dateService.now();

    const docRef = await addDoc(dishesRef, dish);
    console.log("Dish added with id...", docRef.id, dish);

    await updateDishSearchIndex(docRef.id, dish.name);

    return docRef.id;
  },

  async updateDish(id: string, dishData: any) {
    console.log("Updating dish...", id, dishData);
    dishData.createdAt = dateService.now(); //TODO: updatedAt || usedAt
    // Don't store defaultServingSize === 0
    if (!dishData.defaultServingSize) {
      delete dishData.defaultServingSize
    }

    const docRef = doc(dishesRef, id);
    updateDoc(docRef, dishData as any); // TODO: typescript + firebase research

    await updateDishSearchIndex(docRef.id, dishData.name);
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
