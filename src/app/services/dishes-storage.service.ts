import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Dish } from '../models/dish';
import { v4 as uuidv4 } from 'uuid';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DishesStorageService {
  private _items$: Observable<Dish[]>;

  get items$() {
    return this._items$;
  }

  get dishNames$() {
    return this._items$.pipe(
      map((dishes) => {
        return dishes.map((d) => ({ id: d.id, name: d.name }));
      })
    );
  }

  constructor(private firestore: AngularFirestore) {
    this._items$ = this.firestore
      .collection<Dish>('dishes')
      .valueChanges({ idField: 'id' });
  }

  add(dish: Dish) {
    this.firestore.collection('dishes').add(dish);
  }

  delete(id: string) {
    this.firestore.collection('dishes').doc(id).delete();
  }

  getById(id: string) {
    return this.firestore.collection<Dish>('dishes').doc(id).get();
  }
}
