import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient';

import { Dish, DishIngredient } from '../../models/dish';
import { IngredientsStorageService } from './../../ingredients/services/ingredients-storage.service';
import { DishDto } from './../../models/dish-dto';
import { DishUserInput } from './../../models/dish-user-input';

@Injectable({
  providedIn: 'root',
})
export class DishesStorageService {
  private _items$: Observable<Dish[]>;

  /*   get items$() {
    return this._items$;
  }

  get dishNames$() {
    return this._items$.pipe(
      map((dishes) => {
        return dishes.map((d) => ({ id: d.id, name: d.name }));
      })
    );
  } */

  constructor(
    private db: AngularFireDatabase,
    private ingridientsStorage: IngredientsStorageService
  ) {
    // this._items$ = this.firestore
    // .collection<DishDto>('dishes')
    // .valueChanges({ idField: 'id' })
    // .pipe(map((response: DishDto[]) => this.afsDishToUiModel(response)));
  }

  getAll(): Observable<Dish[]> {
    return this.db
      .list<Dish>('/dishes')
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ id: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  create(dish: DishUserInput) {
    this.db.list('/dishes').push(dish);
  }

  add(dish: DishUserInput) {
   /*  const newFirestoreObj: DishDto = {
      name: dish.name,
      ingredients: dish.ingredients.map((item) => {
        return {
          ref: this.ingridientsStorage.getDocRef(item.ingredient.id),
          weight: item.weight,
        };
      }),
      fats: null,
      proteins: null,
      carbs: null,
      calories: null,
    };

    const ingredientIds = dish.ingredients.map((i) => i.ingredient.id);
    this.ingridientsStorage
      .getIngredientsByIds(ingredientIds)
      .subscribe((ingredients) => {
        // newFirestoreObj.fats  = this.sumFoodValue(ingredients, 'proteins'),
        // newFirestoreObj.proteins  = this.sumFoodValue(ingredients, 'fats'),
        // newFirestoreObj.carbs  = this.sumFoodValue(ingredients, 'carbs'),
        // newFirestoreObj.calories  = this.sumFoodValue(ingredients, 'calories'),

        this.firestore.collection('dishes').add(newFirestoreObj);
      }); */
  }

  delete(id: string) {
    return this.db.object('/dishes/' + id).remove();
  }

  getById(id: string) {
    // return this.firestore.collection<Dish>('dishes').doc(id).get();
  }

  private afsDishToUiModel(response: DishDto[]) {
    const dishes: Dish[] = [];

    // Put data from ref field to main obj
    response.forEach((afsObject) => {
      const dish: Dish = {
        name: afsObject.name,
        ingredients: [],
      };
      dishes.push(dish);

      afsObject.ingredients.forEach((ingr) => {
        ingr.ref.get().then((x) => {
          dish.ingredients.push({
            ingredient: x.data() as Ingredient,
            weight: Number(ingr.weight),
          });

          // Calculate dish P,F,C and calories
          dish.proteins = this.sumFoodValue(dish.ingredients, 'proteins');
          dish.fats = this.sumFoodValue(dish.ingredients, 'fats');
          dish.carbs = this.sumFoodValue(dish.ingredients, 'carbs');
          dish.calories = this.sumFoodValue(dish.ingredients, 'calories');
        });
      });
    });

    return dishes;
  }

  private sumFoodValue(ingredients: DishIngredient[], fieldName: string) {
    return ingredients.reduce((acc, item) => {
      acc += (item.weight / 100) * item.ingredient[fieldName];
      return acc;
    }, 0);
  }
}
