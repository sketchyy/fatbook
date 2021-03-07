import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private firestore: AngularFirestore) {}

  getAll(): Observable<Ingredient[]> {
    return this.firestore
      .collection<Ingredient>('/ingredients', (ref) =>
        ref.orderBy('created', 'desc')
      )
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

  findByName(query: string): Promise<Ingredient[]> {
    return this.firestore
      .collection<Ingredient>('/ingredients', (ref) => {
        if (query) {
          const queryStart = query.toLowerCase();
          const queryEnd = queryStart.replace(/.$/, c => String.fromCharCode(c.charCodeAt(0) + 1));

          return ref.orderBy('name').where('name', '>=', queryStart).where('name', '<', queryEnd)
        } else {
          return ref.orderBy('name').limit(20);
        }
      })
      .valueChanges()
      .pipe(take(1))
      .toPromise();
  }
}
