import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { FoodValue } from "../../shared/models/FoodValue";
import { UserSettings } from "../../shared/models/User";
import authService from "./authService";
import firebaseApp from "./firebaseApp";

const db = getFirestore(firebaseApp);

const userSettingsService = {
  async save(dailyDietGoal: FoodValue): Promise<void> {
    const user = await authService.waitForUser();
    const userRef = doc(db, `users`, user.uid);
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
    const user = await authService.waitForUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const userRef = doc(db, `users`, user.uid);
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
