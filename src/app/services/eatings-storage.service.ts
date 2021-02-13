import { DishesStorageService } from 'src/app/services/dishes-storage.service';
import { EatingUserInput } from './../models/eating-user-input';
import { Eating } from './../models/eating';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class EatingsStorageService {
  storage: Eating[] = [
    {
      time: new Date(2021, 1, 13),
      dishName: 'new test meal 1',
      portionSize: 100,
      fat: 1,
      protein: 1,
      carbohydrate: 1,
      calories: 1,
    },
    {
      time: new Date(2021, 1, 12),
      dishName: 'new test meal 2',
      portionSize: 100,
      fat: 1,
      protein: 1,
      carbohydrate: 1,
      calories: 1,
    },
    {
      time: new Date(2021, 1, 12),
      dishName: 'new test meal 3',
      portionSize: 100,
      fat: 1,
      protein: 1,
      carbohydrate: 1,
      calories: 1,
    },
    {
      time: new Date(2021, 1, 11),
      dishName: 'new test meal 4',
      portionSize: 100,
      fat: 1,
      protein: 1,
      carbohydrate: 1,
      calories: 1,
    },
  ];

  constructor(private dishesStorage: DishesStorageService) {}

  getAll() {
    return of(this.storage);
  }

  getForDay(day: Date) {
    return this.storage.filter((eating) => {
      const wrapped = dayjs(eating.time);
      const sameDay =
        wrapped.isSame(day, 'year') &&
        wrapped.isSame(day, 'month') &&
        wrapped.isSame(day, 'day');

      return sameDay;
    });
  }

  add(userInput: EatingUserInput) {
    const eating: Eating = this.enrichEating(userInput);

    this.storage = this.storage.concat(eating);
  }

  delete(eating: Eating) {
    this.storage = this.storage.filter((e) => eating !== e);
  }

  private enrichEating(userInput: EatingUserInput): Eating {
    const dish = this.dishesStorage.findByName(userInput.dishName);

    const portionCoefficient = userInput.portionSize / 100;

    return {
      time: new Date(),
      dishName: userInput.dishName,
      portionSize: userInput.portionSize,
      fat: dish.fat * portionCoefficient,
      protein: dish.protein * portionCoefficient,
      carbohydrate: dish.carbohydrate * portionCoefficient,
      calories: dish.calories * portionCoefficient,
    };
  }
}
