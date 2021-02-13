import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Dish } from '../models/dish';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DishesStorageService {
  storage: Dish[] = [
    {
      id: 'id-1',
      name: 'Картофель',
      fat: 3,
      protein: 11,
      carbohydrate: 40,
      calories: 120,
    },
    {
      id: 'id-2',
      name: 'Гречка с курицей',
      fat: 5,
      protein: 10,
      carbohydrate: 30,
      calories: 200,
    },
    {
      id: 'id-3',
      name: 'Кофе со сливками',
      fat: 1,
      protein: 1.5,
      carbohydrate: 6.5,
      calories: 100,
    }
  ];

  constructor() {}

  getAll() {
    return of(this.storage);
  }

  getDishNames() {
    return this.storage.map((dish) => dish.name);
  }

  add(dish: Dish) {
    dish.id = uuidv4();
    this.storage = this.storage.concat(dish);
  }

  delete(dishName: string) {
    this.storage = this.storage.filter((dish) => dish.name !== dishName);
  }

  findByName(name: string): Dish {
    return this.storage.find((dish) => dish.name === name);
  }
}
