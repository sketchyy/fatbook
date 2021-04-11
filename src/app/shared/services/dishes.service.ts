import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Dish } from '../models/dishes';

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  constructor(private firestore: AngularFirestore) {}

  getAll(): Observable<Dish[]> {
    return this.firestore
      .collection<Dish>('/dishes')
      .valueChanges({ idField: 'id' });
  }

  get(id: string): Observable<Dish> {
    return this.firestore
      .doc<Dish>(`/dishes/${id}`)
      .valueChanges()
      .pipe(take(1));
  }

  createSimple(dish: Dish) {
    dish.name = dish.name.toLowerCase();
    dish.createdAt = moment().toDate().getTime();

    console.log('Adding...', dish);

    this.firestore.collection('/dishes').add(dish);
  }

  replace(id: string, dish: Dish) {
    this.firestore.doc(`/dishes/${id}`).set(dish);
  }

  delete(id: string) {
    return this.firestore.doc('/dishes/' + id).delete();
  }

  findByName(query: string) {
    console.log('query', query);

    // should work for small datasets
    return this.getAll().pipe(
      map((dishes) => {
        return dishes.filter((dish) => dish.name.includes(query.toLowerCase()));
      })
    );
  }

  private sumValue(dishUserInput: any, fieldName: string) {
    return dishUserInput.dishIngredients.reduce((result, dishIngredient) => {
      result +=
        (dishIngredient.weight / 100) *
        dishIngredient.ingredient.foodValue[fieldName];

      return result;
    }, 0);
  }
}
