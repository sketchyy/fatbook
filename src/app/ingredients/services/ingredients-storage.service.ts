import { Ingredient } from './../../models/ingredient';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class IngredientsStorageService {
  private _items$: Observable<Ingredient[]>;

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
      .collection<Ingredient>('ingredients')
      .valueChanges({ idField: 'id' });
  }

  add(dish: Ingredient) {
    this.firestore.collection('ingredients').add(dish);
  }

  delete(id: string) {
    this.firestore.collection('ingredients').doc(id).delete();
  }
}
