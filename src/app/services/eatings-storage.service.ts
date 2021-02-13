import { Eating } from './../models/eating';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EatingsStorageService {
  storage: Eating[] = [
    { time: new Date(), dishName: '', portionSize: 100 },
    { time: new Date(), dishName: '', portionSize: 100 },
    { time: new Date(), dishName: '', portionSize: 100 },
  ]

  constructor() { }

  getAll() {
    return of(this.storage);
  }

  add(eating: Eating) {


    this.storage = this.storage.concat(dish);
  }

  delete(dish: Dish) {

  }


  findByName(name: string) {

  }
}
