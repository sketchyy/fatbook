import { DishIngredient } from './../../models/dish-ingredient';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/ingredient';

import { Dish } from '../../models/dish';
import { IngredientsService } from '../../ingredients/services/ingredients.service';
import { DishUserInput } from './../../models/dish-user-input';

@Injectable({
  providedIn: 'root',
})
// TODO: rename to DishesService
export class DishesStorageService {
  constructor(
    private db: AngularFireDatabase,
    private ingridientsStorage: IngredientsService
  ) {}

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

  async create(userInput: DishUserInput) {
    const dish: Dish = {
      name: userInput.name,
      ingredients: userInput.ingredients,
      proteins: 100,
      fats: 101,
      carbs: 102,
      calories: 103,
    };

    await this.calculateValue(dish);

    console.log('DISH - ', dish);

    this.db.list('/dishes').push(dish);
  }

  delete(id: string) {
    return this.db.object('/dishes/' + id).remove();
  }

  getById(id: string) {
    // return this.firestore.collection<Dish>('dishes').doc(id).get();
  }

  private async calculateValue(dish: Dish) {
    const ids = dish.ingredients.map((i) => i.id);
    const ingredients = await this.ingridientsStorage.getByIds(ids);

    const ingredientsMap = ingredients.reduce((result, item) => {
      result[item.id] = item;
      return result;
    }, {});

    dish.proteins = this.sumValue(dish, ingredientsMap, 'proteins');
    dish.fats = this.sumValue(dish, ingredientsMap, 'fats');
    dish.carbs = this.sumValue(dish, ingredientsMap, 'carbs');
    dish.calories = this.sumValue(dish, ingredientsMap, 'calories');
  }

  private sumValue(
    dish: Dish,
    ingredientsMap: Record<string, Ingredient>,
    fieldName: string
  ) {
    return dish.ingredients.reduce((result, item) => {
      const ingredient = ingredientsMap[item.id];

      result += (item.weight / 100) * ingredient[fieldName];

      return result;
    }, 0);
  }
}
