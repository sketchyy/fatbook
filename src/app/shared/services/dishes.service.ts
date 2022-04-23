import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { Dish } from '../models/dishes';

// TODO:
/*
1) load more (page size = 20) btn
2) search - algorythm for indexing (when new dish added, script for migration)
3)


*/

@Injectable({
  providedIn: 'root',
})
export class DishesService {
  constructor(private firestore: AngularFirestore) {
    this.firestore
      .collection<Dish>('/dishes', (ref) =>
        ref.orderBy('name').startAt('Qwe').limit(10)
      )
      .valueChanges({ idField: 'id' })
      .subscribe((values) => {
        console.log('VALUES = ', values);
        values.forEach((value) => {
          const index = {
            index: value.name.split(' '),
            dishId: value.id,
          };
          // this.firestore.collection('/dishes-indexes').add(index);
        });
      });
  }

  getAll(): Observable<Dish[]> {
    return this.firestore
      .collection<Dish>('/dishes', (ref) =>
        ref.orderBy('name').startAt('Qwe').limit(10)
      )
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

    return this.firestore.collection('/dishes').add(dish);
  }

  replace(id: string, dish: Dish) {
    this.firestore.doc(`/dishes/${id}`).set(dish);
  }

  delete(id: string) {
    return this.firestore.doc('/dishes/' + id).delete();
  }

  findByName(query: string) {
    console.log('query', query);
    if (!query) {
      return this.getAll();
    }

    return this.firestore
      .collection<any>('/dishes-indexes', (ref) =>
        ref.where('index', 'array-contains', query)
      )
      .valueChanges({ idField: 'id' })
      .pipe(
        mergeMap((findResult) => {
          const ids = findResult.map((item) => item.dishId);

          if (ids.length > 0) {
            return this.firestore
              .collection<Dish>('/dishes', (ref) =>
                ref.where(
                  firebase.default.firestore.FieldPath.documentId(),
                  'in',
                  ids
                )
              )
              .valueChanges({ idField: 'id' });
          } else {
            return of([]);
          }
        })
      );
    // .subscribe((res) => console.log('FIND RES = ', res));

    // return of([]);

    // should work for small datasets
    // return this.getAll().pipe(
    //   map((dishes) => {
    //     return dishes.filter((dish) => dish.name.includes(query.toLowerCase()));
    //   })
    // );
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
