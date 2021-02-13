import { DishesStorageService } from 'src/app/services/dishes-storage.service';
import { EatingUserInput } from './../models/eating-user-input';
import { Eating } from './../models/eating';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EatingsStorageService {
  storage: Eating[] = [
    {
      time: new Date(),
      dishName: 'new test meal',
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

  add(userInput: EatingUserInput) {
    const eating: Eating = this.enrichEating(userInput);

    this.storage = this.storage.concat(eating);
  }

  delete() {}

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
