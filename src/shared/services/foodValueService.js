function calculateFoodValue(userInput) {
  if (!userInput.dish || !userInput.dish.foodValue || !userInput.servingSize) {
    return emptyFoodValue();
  }

  return {
    proteins: (userInput.dish.foodValue.proteins * userInput.servingSize) / 100,
    fats: (userInput.dish.foodValue.fats * userInput.servingSize) / 100,
    carbs: (userInput.dish.foodValue.carbs * userInput.servingSize) / 100,
    calories: (userInput.dish.foodValue.calories * userInput.servingSize) / 100,
  };
}

function calculateDishWeight(ingredients) {
  return ingredients.reduce((result, item) => (result += item.servingSize), 0);
}

function calculateDishValuePer100g(ingredients) {
  const totalDishWeight = calculateDishWeight(ingredients);

  const foodValues = ingredients.map((ingredient) =>
    calculateFoodValue(ingredient)
  );

  const resultFoodValue = foodValues.reduce((result, item) => {
    result.proteins += item.proteins;
    result.fats += item.fats;
    result.carbs += item.carbs;
    result.calories += item.calories;

    return result;
  }, emptyFoodValue());

  return {
    proteins: round((resultFoodValue.proteins / totalDishWeight) * 100),
    fats: round((resultFoodValue.fats / totalDishWeight) * 100),
    carbs: round((resultFoodValue.carbs / totalDishWeight) * 100),
    calories: round((resultFoodValue.calories / totalDishWeight) * 100),
  };
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function emptyFoodValue() {
  return {
    proteins: 0,
    fats: 0,
    carbs: 0,
    calories: 0,
  };
}

const foodValueService = {
  calculateDishValuePer100g,
  emptyFoodValue,
};
export default foodValueService;
