// Import the functions you need from the SDKs you need
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import dateService from "../../shared/services/dateService";
import tokenize from "../../shared/utils/tokenize";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);
const dishesRef = collection(db, "dishes");
const dishesSearchIndexRef = collection(db, "dishes-search-index");

// Dishes
const getDishes = async () => {
  const querySnapshot = await getDocs(
    query(dishesRef, orderBy("createdAt", "desc"), limit(5))
  );

  return querySnapshot.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
};

const getDish = async (id) => {
  const docSnap = await getDoc(doc(dishesRef, id));

  return docSnap.data();
};

const createDish = async (dish) => {
  dish.createdAt = dateService.now();

  const docRef = await addDoc(dishesRef, dish);
  console.log("Dish added with id...", docRef.id, dish);

  await updateDishSearchIndex(docRef.id, dish.name);

  return docRef.id;
};

async function updateDish(id, dishData) {
  console.log("Updating dish...", id, dishData);
  dishData.createdAt = dateService.now();

  const docRef = doc(dishesRef, id);
  updateDoc(docRef, dishData);

  await updateDishSearchIndex(docRef.id, dishData.name);
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

const dbService = {
  getDishes,
  getDish,
  deleteDish,
  createDish,
  updateDish,
};

export default dbService;
