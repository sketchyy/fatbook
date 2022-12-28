// Import the functions you need from the SDKs you need
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);
const dishesRef = collection(db, "dishes");

// Dishes
const getDishes = async () => {
  const querySnapshot = await getDocs(
    query(dishesRef, orderBy("name"), limit(5))
  );

  return querySnapshot.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
};

const deleteDish = async (id) => {
  return Promise.all([
    await deleteDoc(doc(db, `/dishes/${id}`)),
    await deleteDoc(doc(db, `/dishes-search-index/${id}`)),
  ]);
};

const dbService = {
  getDishes,
  deleteDish,
};

export default dbService;
