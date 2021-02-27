import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { IngredientRef } from 'src/app/models/ingredient-ref';

import { Ingredient } from './../../models/ingredient';

@Injectable({
  providedIn: 'root',
})
// TODO: rename to IngredientsService
export class IngredientsStorageService {
  private _items$: Observable<Ingredient[]>;

  get items$() {
    return this._items$;
  }

  get selectOptions$() {
    return this._items$.pipe(
      map((ingredients) => {
        return ingredients.map((d) => ({ id: d.id, name: d.name }));
      })
    );
  }

  constructor(
    private db: AngularFireDatabase
  ) {
    // this._items$ = this.firestore
    //   .collection<Ingredient>('ingredients')
    //   .valueChanges({ idField: 'id' });
  }

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

  getIngredientsByIds(ids: string[]) {
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
    return this.items$.pipe(
      take(1),
      map((response) => {
        return response
          .filter((ingr: Ingredient) =>
            ingr.name.toLocaleLowerCase().startsWith(query.toLocaleLowerCase())
          )
          .map((ingr: Ingredient) => ({ name: ingr.name, id: ingr.id }));
      })
    );
  }
}
