import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
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
    return this.firestore.doc<Dish>(`/dishes/${id}`).valueChanges().pipe(take(1));
  }

  createSimple(dish: Dish) {
    dish.name = dish.name.toLowerCase();
    dish.createdAt = moment().toDate().getTime();

    console.log('Adding...', dish);


    this.firestore.collection('/dishes').add(dish);
  }

  create(userInput: any) {
    const dish: Dish = {
      // Lowercase name for search
      name: userInput.name.toLowerCase(),
      createdAt: moment().toDate().getTime(),
      ingredients: userInput.dishIngredients.map((di) => di.ingredient),
      foodValue: {
        proteins: this.sumValue(userInput, 'proteins'),
        fats: this.sumValue(userInput, 'fats'),
        carbs: this.sumValue(userInput, 'carbs'),
        calories: this.sumValue(userInput, 'calories'),
      },
      defaultServingSize: userInput.defaultServingSize
    };

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

    return this.firestore
      .collection<Dish>('/dishes', (ref) => {
        if (query) {
          const queryStart = query.toLowerCase();
          const queryEnd = queryStart.replace(/.$/, (c) =>
            String.fromCharCode(c.charCodeAt(0) + 1)
          );

          return ref
            .orderBy('name')
            .where('name', '>=', queryStart)
            .where('name', '<', queryEnd);
        } else {
          return ref.orderBy('name').limit(20);
        }
      })
      .valueChanges();
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
