// Import the functions you need from the SDKs you need
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);
const dishesRef = collection(db, "dishes");
const dishesSearchIndexRef = collection(db, "dishes-search-index");

// Dishes
const getDishes = async () => {
  const querySnapshot = await getDocs(
    query(dishesRef, orderBy("name"), limit(5))
  );

  return querySnapshot.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
};

const getDish = async (id) => {
  const docSnap = await getDoc(doc(dishesRef, id));

  return docSnap.data();
};

const deleteDish = async (id) => {
  return Promise.all([
    await deleteDoc(doc(dishesRef, id)),
    await deleteDoc(doc(dishesSearchIndexRef, id)),
  ]);
};

const dbService = {
  getDishes,
  getDish,
  deleteDish,
};

export default dbService;
