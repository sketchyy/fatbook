import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { DishesStorageService } from 'src/app/services/dishes-storage.service';

import { Dish } from '../models/dish';
import { Eating } from './../models/eating';
import { EatingUserInput } from './../models/eating-user-input';

@Injectable({
  providedIn: 'root',
})
export class EatingsStorageService {
  private _items$: Observable<Eating[]>;

  get items$() {
    return this._items$;
  }

  constructor(
    private dishesStorage: DishesStorageService,
    private firestore: AngularFirestore
  ) {
    this._items$ = this.firestore
      .collection<Eating>('eatings')
      .valueChanges({ idField: 'id' });
  }

  getForDay(day: Date) {
    const startDate = dayjs(day)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .toDate();
    const endDate = dayjs(day)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .add(1, 'day')
      .toDate();

    return this.firestore
      .collection<Eating>('eatings', (ref) =>
        ref.where('time', '>=', startDate).where('time', '<', endDate)
      )
      .valueChanges();
  }

  add(userInput: EatingUserInput) {
    this.dishesStorage.getById(userInput.dish.id).subscribe((doc) => {
      const dish = doc.data();
      const eating: Eating = this.enrichEating(userInput, dish);

      this.firestore.collection<Eating>('eatings').add(eating);
    });
  }

  delete(id: string) {
    this.firestore.collection('eatings').doc(id).delete();
  }

  private enrichEating(userInput: EatingUserInput, dish: Dish) {
    const portionCoefficient = userInput.portionSize / 100;

    return {
      time: new Date(),
      dishName: dish.name,
      portionSize: userInput.portionSize,
      fat: dish.fat * portionCoefficient,
      protein: dish.protein * portionCoefficient,
      carbohydrate: dish.carbohydrate * portionCoefficient,
      calories: dish.calories * portionCoefficient,
    };
  }
}
