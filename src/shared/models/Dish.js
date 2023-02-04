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
    this.defaultServingSize = defaultServingSize ?? null;
    this.createdAt = createdAt ?? null;
  }

  hasIngredients() {
    return this.ingredients.length > 0;
  }

  addIngredients(ingredients) {
    this.ingredients = [...ingredients, ...this.ingredients];
    this.foodValue = foodValueService.calculateDishValuePer100g(
      this.ingredients
    );
  }

  updateIngredient(ingredient) {
    const index = this.ingredients.findIndex(
      (ing) => ing.dish.id === ingredient.dish.id
    );

    console.log("ing=", ingredient, index);

    if (index >= 0) {
      this.ingredients[index] = ingredient;

      this.foodValue = foodValueService.calculateDishValuePer100g(
        this.ingredients
      );
    }
  }

  deleteIngredient(ingredient) {
    this.ingredients = this.ingredients.filter((item) => item !== ingredient);

    if (this.hasIngredients()) {
      this.foodValue = foodValueService.calculateDishValuePer100g(
        this.ingredients
      );
    } else {
      this.foodValue = foodValueService.emptyFoodValue();
    }
  }

  toJsonSimple() {
    return {
      id: this.id,
      name: this.name,
      foodValue: this.foodValue,
      defaultServingSize: this.defaultServingSize,
      createdAt: this.createdAt,
    };
  }
}

export const dishConverter = {
  toFirestore: (dish) => {
    console.log("dish converter to firestore", dish);
    const jsonIngredients = dish.ingredients?.map((ingredient) => ({
      ...ingredient,
      dish: dishConverter.toFirestore(ingredient.dish),
    }));

    return {
      id: dish.id ?? null,
      name: dish.name,
      foodValue: dish.foodValue,
      ingredients: jsonIngredients ?? [],
      defaultServingSize: dish.defaultServingSize ?? null,
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
