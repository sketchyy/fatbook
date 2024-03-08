import DishClass from "@/shared/models/DishClass";

function calculateFoodValue(eating) {
  if (!eating.dish || !eating.dish.foodValue || !eating.servingSize) {
    return foodValueService.emptyFoodValue();
  }

  return {
    proteins: (eating.dish.foodValue.proteins * eating.servingSize) / 100,
    fats: (eating.dish.foodValue.fats * eating.servingSize) / 100,
    carbs: (eating.dish.foodValue.carbs * eating.servingSize) / 100,
    calories: (eating.dish.foodValue.calories * eating.servingSize) / 100,
  };
}

function calculateDishWeight(ingredients) {
  return ingredients.reduce((result, item) => (result += item.servingSize), 0);
}

const foodValueService = {
  calculateDishValuePer100g(ingredients, cookedWeight?: number | null) {
    const totalDishWeight = cookedWeight ?? calculateDishWeight(ingredients);

    const foodValues = ingredients.map((ingredient) =>
      calculateFoodValue(ingredient),
    );

    const resultFoodValue = foodValues.reduce((result, item) => {
      result.proteins += item.proteins;
      result.fats += item.fats;
      result.carbs += item.carbs;
      result.calories += item.calories;

      return result;
    }, this.emptyFoodValue());

    return {
      proteins: (resultFoodValue.proteins / totalDishWeight) * 100,
      fats: (resultFoodValue.fats / totalDishWeight) * 100,
      carbs: (resultFoodValue.carbs / totalDishWeight) * 100,
      calories: (resultFoodValue.calories / totalDishWeight) * 100,
    };
  },

  calculateOwnDishValuePer100g(dish: DishClass, cookedWeight?: number | null) {
    const totalDishWeight = cookedWeight ?? dish.defaultServingSize ?? 100;

    return {
      proteins: (dish.foodValue.proteins / totalDishWeight) * 100,
      fats: (dish.foodValue.fats / totalDishWeight) * 100,
      carbs: (dish.foodValue.carbs / totalDishWeight) * 100,
      calories: (dish.foodValue.calories / totalDishWeight) * 100,
    };
  },

  calculateFoodValueForPortion({ dish, servingSize }) {
    return {
      proteins: (dish.foodValue.proteins * servingSize) / 100,
      fats: (dish.foodValue.fats * servingSize) / 100,
      carbs: (dish.foodValue.carbs * servingSize) / 100,
      calories: (dish.foodValue.calories * servingSize) / 100,
    };
  },

  sumFoodValues(foodValues) {
    return foodValues.reduce((result, current) => {
      result.proteins += current.proteins;
      result.fats += current.fats;
      result.carbs += current.carbs;
      result.calories += current.calories;

      return result;
    }, this.emptyFoodValue());
  },

  emptyFoodValue() {
    return {
      proteins: 0,
      fats: 0,
      carbs: 0,
      calories: 0,
    };
  },
};

export default foodValueService;
