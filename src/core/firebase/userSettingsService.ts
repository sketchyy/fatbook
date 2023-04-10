import {
  DocumentReference,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FoodValue } from "../../shared/models/FoodValue";
import { UserSettings } from "../../shared/models/UserSettings";
import authService from "./authService";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);
let userRef: DocumentReference;

/* Read authenticated user's userId to use in logDays collection */
const unsubscribe = authService.subscribeToAuthChanged((user) => {
  userRef = doc(db, `users`, user.uid);
  unsubscribe();
});

const userSettingsService = {
  async save(dailyDietGoal: FoodValue): Promise<void> {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      await updateDoc(userRef, {
        settings: {
          dailyDietGoal,
        },
      });
    } else {
      await setDoc(userRef, {
        settings: {
          dailyDietGoal,
        },
      });
    }
  },
  async get(): Promise<UserSettings> {
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      return userSnapshot.data().settings;
    } else {
      return {
        dailyDietGoal: {
          proteins: 0,
          fats: 0,
          carbs: 0,
          kcal: 0,
        },
      };
    }
  },
};

export default userSettingsService;
