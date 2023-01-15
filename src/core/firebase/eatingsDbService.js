import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { LogDay, logDayConverter } from "../../shared/models/LogDay";
import dateService from "../../shared/services/dateService";
import authService from "./authService";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);

let logDaysRef;

/* Read authenticated user's userId to use in logDays collection */
const unsubscribe = authService.subscribeToAuthChanged((user) => {
  console.log("dbserv = ", user);
  logDaysRef = collection(db, `users/${user.uid}/log-days`).withConverter(
    logDayConverter
  );
  unsubscribe();
});

/**
 * Tries to read LogDay from database, if not found, returns empty LogDay.
 *
 * @param {Date} day for searching logDay
 * @returns {LogDay}
 */
export async function getOrCreateLogDay(date) {
  const docRef = await getDoc(doc(logDaysRef, date));
  let logDayFromDb = docRef.data();

  console.log("take log day from db", logDayFromDb);

  if (!logDayFromDb) {
    logDayFromDb = LogDay.empty();
  }

  return logDayFromDb;
}

export function subscribeToLogDayChanges(day, onNext) {
  const id = dateService.format(day);

  const unsubscribe = onSnapshot(doc(logDaysRef, id), (doc) =>
    onNext(doc.data())
  );

  return unsubscribe;
}

export async function replaceLogDay(dayId, logDay) {
  console.log("Replacing logday...", logDay);
  logDay.timestamp = dateService.now(); //TODO: updatedAt || usedAt

  const docRef = doc(logDaysRef, dayId);
  await setDoc(docRef, logDay);
}

export async function addEating(dish) {
  //   dish.createdAt = dateService.now();
  //   const docRef = await addDoc(dishesRef, dish);
  //   console.log("Dish added with id...", docRef.id, dish);
  //   await updateDishSearchIndex(docRef.id, dish.name);
  //   return docRef.id;
}

const eatingsDbService = {
  getOrCreateLogDay,
  replaceLogDay,
  subscribeToLogDayChanges,
};

export default eatingsDbService;
