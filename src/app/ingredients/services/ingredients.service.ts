import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Ingredient } from '../../models/ingredient';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private firestore: AngularFirestore) {}

  getAll(): Observable<Ingredient[]> {
    return this.firestore
      .collection<Ingredient>('/ingredients', ref => ref.orderBy('created', 'desc'))
      .valueChanges({ idField: 'id' });
  }

  create(ingredient: Ingredient) {
    ingredient.created = new Date().getTime();

    // Lowercase name for search
    ingredient.name = ingredient.name.toLowerCase();

    this.firestore.collection('/ingredients').add(ingredient);
  }

  delete(id: string) {
    return this.firestore.doc('/ingredients/' + id).delete();
  }

  getByIds(ids: string[]): Promise<Ingredient[]> {
    return this.firestore
      .collection<Ingredient>('/ingredients')
      .valueChanges({ idField: 'id' })
      .pipe(take(1))
      .toPromise();
  }

  /* Firebase doesn't support fuzzy search with like operator and ignore case, so load all on client and filter here */
  /*  findByName(query: string): Observable<IngredientRef[]> {
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
  } */
}
