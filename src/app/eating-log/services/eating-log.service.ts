import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { LogEating } from 'src/app/models/log-eating';

import { LogDay } from './../../models/log-day';

@Injectable({
  providedIn: 'root',
})
export class EatingLogService {
  constructor(
    private firestore: AngularFirestore,
    private db: AngularFireDatabase
  ) {}

  userId = 'testuser'; // TODO: populate actual userId

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
    const currentMonthStartTime = dayjs().startOf('month').toDate().getTime();

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

  async create(userInput) {
    const newEating: LogEating = {
      timestamp: dayjs('03-Mar-2021').toDate().getTime(), // TODO: datepicker
      // timestamp
      dishId: '-MUXmkGEPrDg7_6cOh5W',
      dishName: 'Test Dish',
      servingWeight: 200,
      totals: null,
    };

    // Calculate eating food value and save it to db
    const dish = (
      await this.db.database.ref('/dishes/' + newEating.dishId).get()
    ).val();

    newEating.totals = {
      proteins: (dish.proteins * newEating.servingWeight) / 100,
      fats: (dish.fats * newEating.servingWeight) / 100,
      carbs: (dish.carbs * newEating.servingWeight) / 100,
      calories: (dish.calories * newEating.servingWeight) / 100,
    };
    this.firestore
      .collection(`users/${this.userId}/log-days/03-Mar-2021/eatings`)
      .add(newEating);

    // update logday totals and save it to db
    const logDay = (
      await this.firestore
        .doc(`users/${this.userId}/log-days/03-Mar-2021`)
        .get()
        .toPromise()
    ).data() as any;
    logDay.totals.proteins += newEating.totals.proteins;
    logDay.totals.fats += newEating.totals.fats;
    logDay.totals.carbs += newEating.totals.carbs;
    logDay.totals.calories += newEating.totals.calories;
    this.firestore
      .doc(`users/${this.userId}/log-days/03-Mar-2021`)
      .set(logDay, { merge: true });
  }
}

const mockDays = {
  '27-Feb-2021': {
    timestamp: dayjs('27-Feb-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '28-Feb-2021': {
    timestamp: dayjs('28-Feb-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '01-Mar-2021': {
    timestamp: dayjs('01-Mar-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '02-Mar-2021': {
    timestamp: dayjs('02-Mar-2021').toDate().getTime(),
    totals: {
      proteins: Math.random() * 100,
      carbs: Math.random() * 100,
      fats: Math.random() * 100,
      calories: Math.random() * 1000,
    },
  },
  '03-Mar-2021': {
    timestamp: dayjs('03-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('03-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('03-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('03-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('02-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('02-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('01-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('01-Mar-2021').toDate().getTime(),
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
    timestamp: dayjs('28-Feb-2021').toDate().getTime(),
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
    timestamp: dayjs('28-Feb-2021').toDate().getTime(),
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
    timestamp: dayjs('27-Feb-2021').toDate().getTime(),
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
