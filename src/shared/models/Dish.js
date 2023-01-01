import foodValueService from "../services/foodValueService";

export default class Dish {
  static empty() {
    return new Dish(
      null,
      "",
      {
        carbs: "",
        proteins: "",
        calories: "",
        fats: "",
      },
      [],
      ""
    );
  }

  id;
  name;
  foodValue;
  ingredients;
  defaultServingSize;
  createdAt;

  constructor(
    id,
    name,
    foodValue = {},
    ingredients = [],
    defaultServingSize,
    createdAt
  ) {
    this.id = id;
    this.name = name;
    this.foodValue = foodValue;
    this.ingredients = ingredients;
    this.defaultServingSize = defaultServingSize;
    this.createdAt = createdAt;
  }

  hasIngredients() {
    return this.ingredients.length > 0;
  }

  addIngredient(ingredient) {
    this.ingredients = [ingredient, ...this.ingredients];
    this.foodValue = foodValueService.calculateDishValuePer100g(
      this.ingredients
    );
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter(
      (item) => item.dish !== ingredient
    );

    if (this.hasIngredients()) {
      this.foodValue = foodValueService.calculateDishValuePer100g(
        this.ingredients
      );
    } else {
      this.foodValue = foodValueService.emptyFoodValue();
    }
  }
}

export const dishConverter = {
  toFirestore: (dish) => {
    console.log("dish converter to firestore", dish);
    const jsonIngredients = dish.ingredients.map((ingredient) => ({
      ...ingredient,
      dish: dishConverter.toFirestore(ingredient.dish),
    }));

    return {
      id: dish.id ?? null,
      name: dish.name,
      foodValue: dish.foodValue,
      ingredients: jsonIngredients,
      defaultServingSize: dish.defaultServingSize,
      createdAt: dish.createdAt ?? null,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Dish(
      snapshot.id,
      data.name,
      data.foodValue,
      data.ingredients,
      data.defaultServingSize,
      data.createdAt
    );
  },
};
