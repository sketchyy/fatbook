// Import the functions you need from the SDKs you need
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
import { dishConverter } from "../../shared/models/Dish";
import dateService from "../../shared/services/dateService";
import tokenize from "../../shared/utils/tokenize";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);
const dishesRef = collection(db, "dishes").withConverter(dishConverter);
const dishesSearchIndexRef = collection(db, "dishes-search-index");

// Dishes
const getDishes = async () => {
  const querySnapshot = await getDocs(
    query(dishesRef, orderBy("createdAt", "desc"), limit(50))
  );

  return querySnapshot.docs.map((doc) => doc.data());
};

function subscribeToDishChanges(id, onNext) {
  const unsubscribe = onSnapshot(doc(dishesRef, id), (doc) =>
    onNext(doc.data())
  );

  return unsubscribe;
}

const getDish = async (id) => {
  const docSnap = await getDoc(doc(dishesRef, id));

  return docSnap.data();
};

async function searchDishes(userQuery) {
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
}

function prepareSearchQuery(query) {
  return query.toLowerCase().trim().replace(" ", "__");
}

const createDish = async (dish) => {
  dish.createdAt = dateService.now();

  const docRef = await addDoc(dishesRef, dish);
  console.log("Dish added with id...", docRef.id, dish);

  await updateDishSearchIndex(docRef.id, dish.name);

  return docRef.id;
};

async function updateDish(id, dishData) {
  console.log("Updating dish...", id, dishData);
  dishData.createdAt = dateService.now(); //TODO: updatedAt || usedAt

  const docRef = doc(dishesRef, id);
  updateDoc(docRef, dishData);

  await updateDishSearchIndex(docRef.id, dishData.name);
}

async function replaceDish(dish) {
  console.log("Replacing dish...", dish);
  dish.createdAt = dateService.now(); //TODO: updatedAt || usedAt

  const docRef = doc(dishesRef, dish.id);
  setDoc(docRef, dish);

  await updateDishSearchIndex(docRef.id, dish.name);
}

const deleteDish = async (id) => {
  return Promise.all([
    await deleteDoc(doc(dishesRef, id)),
    await deleteDoc(doc(dishesSearchIndexRef, id)),
  ]);
};

async function updateDishSearchIndex(id, name) {
  const searchIndex = {
    index: name ? tokenize(name) : [],
  };
  const indexDocRef = doc(dishesSearchIndexRef, id);
  await setDoc(indexDocRef, searchIndex);
  console.log("Dish index added...", id, searchIndex);
}

// TODO: rename to dishesService
const dishesDbService = {
  getDishes,
  getDish,
  subscribeToDishChanges,
  searchDishes,
  deleteDish,
  createDish,
  updateDish,
  replaceDish,
};

export default dishesDbService;
