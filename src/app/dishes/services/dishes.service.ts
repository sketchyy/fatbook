import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Dish } from '../../models/dish';
import { DishUserInput } from './../../models/dish-user-input';

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

  create(userInput: DishUserInput) {
    const dish: Dish = {
      name: userInput.name,
      ingredients: userInput.dishIngredients.map((di) => di.ingredient),
      totals: {
        proteins: this.sumValue(userInput, 'proteins'),
        fats: this.sumValue(userInput, 'fats'),
        carbs: this.sumValue(userInput, 'carbs'),
        calories: this.sumValue(userInput, 'calories'),
      },
    };

    this.firestore.collection('/dishes').add(dish);
  }

  delete(id: string) {
    return this.firestore.doc('/dishes/' + id).delete();
  }

  private sumValue(dishUserInput: DishUserInput, fieldName: string) {
    return dishUserInput.dishIngredients.reduce((result, dishIngredient) => {
      result +=
        (dishIngredient.weight / 100) *
        dishIngredient.ingredient.foodValue[fieldName];

      return result;
    }, 0);
  }
}
