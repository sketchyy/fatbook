import { EatingForm, EatingInput } from './../../models/log-eating';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { LogDay } from 'src/app/models/log-day';
import { Eating } from 'src/app/models/log-eating';

@Injectable({
  providedIn: 'root',
})
export class EatingLogService {
  userId: string;

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.currentUser.then((currentUser) => {
      this.userId = currentUser.uid;
    });
  }

  pushMocks() {
    Object.keys(mockDays).forEach((day) => {
      this.firestore
        .collection(`users/${this.userId}/log-days`)
        .doc(day)
        .set(mockDays[day]);
    });

    mockData.forEach((eating) => {
      this.firestore
        .collection(`users/${this.userId}/log-days/03-Mar-2021/eatings`)
        .add(eating);
    });
  }

  getThisMonthDays(): Observable<LogDay[]> {
    const currentMonthStartTime = moment()
      .clone()
      .startOf('month')
      .toDate()
      .getTime();

    return this.firestore
      .collection<LogDay>(`users/${this.userId}/log-days`, (ref) => {
        return ref
          .orderBy('timestamp', 'desc')
          .where('timestamp', '>=', currentMonthStartTime);
      })
      .valueChanges({ idField: 'id' });
  }

  getEatings(logDayId: string) {
    console.log('Get Eatings', logDayId);

    return this.firestore
      .collection<Eating>(`users/${this.userId}/log-days/${logDayId}/eatings`)
      .valueChanges({ idField: 'id' });
  }

  async addEatings(eatingForm: EatingForm) {
    const newEatingDay = moment(eatingForm.timestamp).format('DD-MMM-YYYY');
    const logDay = await this.getOrCreateLogDay(
      newEatingDay,
      eatingForm.timestamp
    );

    eatingForm.eatings.forEach(async (eatingInput: EatingInput) => {
      const eating: Eating = {
        timestamp: eatingForm.timestamp,
        dish: eatingInput.dish,
        servingSize: eatingInput.servingSize,
        totals: {
          proteins:
            (eatingInput.dish.foodValue.proteins * eatingInput.servingSize) /
            100,
          fats:
            (eatingInput.dish.foodValue.fats * eatingInput.servingSize) / 100,
          carbs:
            (eatingInput.dish.foodValue.carbs * eatingInput.servingSize) / 100,
          calories:
            (eatingInput.dish.foodValue.calories * eatingInput.servingSize) /
            100,
        },
      };

      // Update logDay totals
      logDay.totals.proteins += eating.totals.proteins;
      logDay.totals.fats += eating.totals.fats;
      logDay.totals.carbs += eating.totals.carbs;
      logDay.totals.calories += eating.totals.calories;

      // Save eating
      await this.firestore
        .collection(`users/${this.userId}/log-days/${newEatingDay}/eatings`)
        .add(eating);
    });

    // Save logDay after all eatings saved
    this.firestore
      .doc(`users/${this.userId}/log-days/${newEatingDay}`)
      .set(logDay, { merge: true });
  }

  async removeEating(logDayId: string, eating: Eating) {
    // Remove eating
    this.firestore
      .doc(`users/${this.userId}/log-days/${logDayId}/eatings/${eating.id}`)
      .delete();

    // Update log day totals
    const logDay = await this.getOrCreateLogDay(logDayId, eating.timestamp);

    logDay.totals.proteins -= eating.totals.proteins;
    logDay.totals.fats -= eating.totals.fats;
    logDay.totals.carbs -= eating.totals.carbs;
    logDay.totals.calories -= eating.totals.calories;

    this.firestore
      .doc(`users/${this.userId}/log-days/${logDayId}`)
      .set(logDay, { merge: true });
  }

  private async getOrCreateLogDay(
    dayFormatted: string,
    timestamp: number
  ): Promise<LogDay> {
    let logDay: LogDay = (
      await this.firestore
        .doc(`users/${this.userId}/log-days/${dayFormatted}`)
        .get()
        .toPromise()
    ).data() as any;

    if (!logDay) {
      logDay = {
        timestamp: timestamp,
        totals: {
          proteins: 0,
          fats: 0,
          carbs: 0,
          calories: 0,
        },
      };
    }

    return logDay;
  }
}

const mockDays = {
  '27-Feb-2021': {
    timestamp: moment('27-Feb-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '28-Feb-2021': {
    timestamp: moment('28-Feb-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '01-Mar-2021': {
    timestamp: moment('01-Mar-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '02-Mar-2021': {
    timestamp: moment('02-Mar-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '03-Mar-2021': {
    timestamp: moment('03-Mar-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
};

const mockData = [
  {
    timestamp: moment('03-Mar-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('03-Mar-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('03-Mar-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('02-Mar-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('02-Mar-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('01-Mar-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('01-Mar-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('28-Feb-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
  {
    timestamp: moment('28-Feb-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },

  {
    timestamp: moment('27-Feb-2021').toDate().getTime(),
    dishId: '-MUXmkGEPrDg7_6cOh5W',
    dishName: 'Test Dish ' + Math.random() * 100,
    servingWeight: 200,
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
    userId: 'testuser',
  },
];
