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

export async function getOrCreateLogDay(
  date: string | undefined
): Promise<LogDay> {
  const docRef = await getDoc(doc(logDaysRef, date));
  let logDayFromDb = docRef.data() as LogDay;

  console.log("take log day from db", logDayFromDb);

  if (!logDayFromDb) {
    logDayFromDb = LogDay.empty();
    logDayFromDb.id = date;
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

// TODO: same as dateService
const eatingsDbService = {
  getOrCreateLogDay,
  replaceLogDay,
  subscribeToLogDayChanges,
};

export default eatingsDbService;
