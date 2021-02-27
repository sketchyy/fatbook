import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IngredientRef } from 'src/app/models/ingredient-ref';

import { Ingredient } from './../../models/ingredient';

@Injectable({
  providedIn: 'root',
})
// TODO: rename to IngredientsService
export class IngredientsStorageService {
  constructor(private db: AngularFireDatabase) {}

  getAll(): Observable<Ingredient[]> {
    return this.db
      .list<Ingredient>('/ingredients')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  create(ingredient: Ingredient) {
    this.db.list('/ingredients').push(ingredient);
  }

  delete(id: string) {
    return this.db.object('/ingredients/' + id).remove();
  }

  getByIds(ids: string[]): Promise<Ingredient[]> {
    return this.db
      .list<Ingredient>('/ingredients')
      .snapshotChanges()
      .pipe(
        take(1),
        map((changes) =>
          changes
          .filter(c => ids.includes(c.payload.key) )
          .map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      )
      .toPromise();
    // return this.firestore
    //   .collection<Ingredient>('ingredients', (ref) =>
    //     ref.where('id', 'array-contains', ids)
    //   )
    //   .valueChanges()
    //   .pipe(take(1));
  }

  getDocRef(id: string) {
    // console.log('ID', id);
    // return this.firestore.collection<Ingredient>('ingredients').doc(id).ref;
  }

  /* Firebase doesn't support fuzzy search with like operator and ignore case, so load all on client and filter here */
  findByName(query: string): Observable<IngredientRef[]> {
    return this.db
      .list<Ingredient>('/ingredients', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        take(1),
        map((changes) =>
          changes.filter((item: SnapshotAction<Ingredient>) => {
            const itemName = item.payload.val().name.toLocaleLowerCase();
            return itemName.startsWith(query.toLocaleLowerCase());
          })
        ),
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.key,
            name: c.payload.val().name,
          }))
        )
      );
  }
}
