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
      name: 'Test Dish 1',
      fat: 10,
      protein: 11,
      carbohydrate: 50,
      calories: 1000,
    },
    {
      id: 'id-2',
      name: 'Test Dish 2',
      fat: 10,
      protein: 11,
      carbohydrate: 50,
      calories: 1000,
    },
    {
      id: 'id-3',
      name: 'Test Dish 3',
      fat: 10,
      protein: 11,
      carbohydrate: 50,
      calories: 1000,
    },
    {
      id: 'id-4',
      name: 'Test Dish 4',
      fat: 10,
      protein: 11,
      carbohydrate: 50,
      calories: 1000,
    },
    {
      id: 'id-5',
      name: 'Test Dish 5',
      fat: 10,
      protein: 11,
      carbohydrate: 50,
      calories: 1000,
    },
    {
      id: 'id-6',
      name: 'Test Dish 6',
      fat: 10,
      protein: 11,
      carbohydrate: 50,
      calories: 1000,
    },
  ];

  constructor() {}

  getAll() {
    return of(this.storage);
  }

  add(dish: Dish) {
    dish.id = uuidv4();
    this.storage = this.storage.concat(dish);
  }

  delete(dish: Dish) {}

  findByName(name: string) {}
}
