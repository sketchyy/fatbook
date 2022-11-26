import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { documentId } from 'firebase/firestore';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
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
  dishes$: Observable<Dish[]>;

  constructor(private firestore: AngularFirestore) {
    // TODO: create admin page with "recalculate indixes" button, access only for me
    /* this.firestore
      .collection<Dish>('/dishes')
      .valueChanges({ idField: 'id' })
      .subscribe((values) => {
        console.log('VALUES = ', values.length);
        values.forEach((value) => {
          const index = {
            index: this.tokenize(value.name),
          };
          // this.firestore.doc(`dishes-search-index/${value.id}`).set(index);
        });
      }); */

    this.dishes$ = this.firestore
      .collection<Dish>('/dishes', (ref) =>
        ref.orderBy('name').startAt('Qwe').limit(20)
      )
      // .get()
      .valueChanges({ idField: 'id' })
      .pipe(
        tap((values) => console.log('GET ALL, ', values))
        // map((querySnapshot) =>
        //   querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        // )
      );
  }

  // TODO: Paging, rename "watchAll"
  getAll(): Observable<Dish[]> {
    return this.dishes$;
  }

  get(id: string): Observable<Dish> {
    return this.firestore
      .doc<Dish>(`/dishes/${id}`)
      .get()
      .pipe(
        take(1),
        map((docSnap) => docSnap.data()),
        tap((values) => console.log('GET ONE, ', values))
      );
  }

  async createSimple(dish: Dish) {
    dish.name = dish.name.toLowerCase();
    dish.createdAt = moment().toDate().getTime();

    console.log('Adding...', dish);

    const newDoc = await this.firestore.collection('/dishes').add(dish);

    const searchIndex = {
      index: this.tokenize(dish.name),
    };
    console.log('Updating index...', searchIndex);
    return this.firestore
      .doc(`/dishes-search-index/${newDoc.id}`)
      .set(searchIndex);
  }

  replace(id: string, dish: Dish) {
    this.firestore.doc(`/dishes/${id}`).set(dish);

    const searchIndex = {
      index: this.tokenize(dish.name),
    };

    return this.firestore.doc(`/dishes-search-index/${id}`).set(searchIndex);
  }

  delete(id: string) {
    return Promise.all([
      this.firestore.doc(`/dishes/${id}`).delete(),
      this.firestore.doc(`/dishes-search-index/${id}`).delete(),
    ]);
  }

  // TODO: limit 5? 2 times
  findByName(query: string) {
    if (!query) {
      return this.dishes$;
    }
    const searchToken = this.prepareSearchQuery(query);

    return this.firestore
      .collection<any>('/dishes-search-index', (ref) =>
        ref.where('index', 'array-contains', searchToken).limit(10)
      )
      .get()
      .pipe(
        tap((querySnap) => console.log('FIND BY NAME, ', querySnap)),
        mergeMap((querySnap) => {
          const ids = querySnap.docs.map((item) => item.id);

          if (ids.length > 0) {
            return this.firestore
              .collection<Dish>('/dishes', (ref) =>
                ref.where(documentId(), 'in', ids)
              )
              .valueChanges({ idField: 'id' })
              .pipe(
                tap((values) => console.log('FIND BY NAME 2, ', values.length))
              );
          } else {
            return of([]);
          }
        })
      );
  }

  private prepareSearchQuery(query: string): string {
    return query.toLowerCase().trim().replace(' ', '__');
  }

  private tokenize(name: string): string[] {
    const words = name.toLowerCase().replace(/[()]/g, '').split(' ');
    const tokens = [];
    tokens.push(name);
    tokens.push(...words);

    words.forEach((word) => {
      for (let i = 3; i < word.length; i++) {
        tokens.push(word.substring(0, i));
      }
    });

    words.forEach((word1) => {
      words
        .filter((word) => word !== word1)
        .forEach((word2) => {
          tokens.push(word1 + '__' + word2);
          if (word2.length > 4) {
            tokens.push(word1 + '__' + word2.substring(0, word2.length - 1));
            tokens.push(word1 + '__' + word2.substring(0, word2.length - 2));
          }
        });
    });

    return tokens;
  }
}
