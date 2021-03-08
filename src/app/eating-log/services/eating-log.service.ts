import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { LogDay } from 'src/app/models/log-day';
import { LogEating } from 'src/app/models/log-eating';

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
    const currentMonthStartTime = moment().clone().startOf('month').toDate().getTime();

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
      .collection<LogEating>(
        `users/${this.userId}/log-days/${logDayId}/eatings`
      )
      .valueChanges({ idField: 'id' });
  }

  async create(newEating: LogEating) {
    const newEatingDay = moment(newEating.timestamp).format('DD-MMM-YYYY');

    // Calculate eating food value
    newEating.totals = {
      proteins:
        (newEating.dish.totals.proteins * newEating.servingWeight) / 100,
      fats: (newEating.dish.totals.fats * newEating.servingWeight) / 100,
      carbs: (newEating.dish.totals.carbs * newEating.servingWeight) / 100,
      calories:
        (newEating.dish.totals.calories * newEating.servingWeight) / 100,
    };

    this.firestore
      .collection(`users/${this.userId}/log-days/${newEatingDay}/eatings`)
      .add(newEating);

    // update day totals and save it to db
    const logDay = await this.getOrCreateLogDay(newEatingDay, newEating);

    logDay.totals.proteins += newEating.totals.proteins;
    logDay.totals.fats += newEating.totals.fats;
    logDay.totals.carbs += newEating.totals.carbs;
    logDay.totals.calories += newEating.totals.calories;

    this.firestore
      .doc(`users/${this.userId}/log-days/${newEatingDay}`)
      .set(logDay, { merge: true });
  }

  async removeEating(logDayId: string, eating: LogEating) {
    // Remove eating
    this.firestore
      .doc(`users/${this.userId}/log-days/${logDayId}/eatings/${eating.id}`)
      .delete();

    // Update log day totals
    const logDay = await this.getOrCreateLogDay(logDayId, eating);

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
    newEating: LogEating
  ): Promise<LogDay> {
    let logDay: LogDay = (
      await this.firestore
        .doc(`users/${this.userId}/log-days/${dayFormatted}`)
        .get()
        .toPromise()
    ).data() as any;

    if (!logDay) {
      logDay = {
        timestamp: newEating.timestamp,
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
