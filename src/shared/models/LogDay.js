import dateService from "../services/dateService";
import foodValueService from "../services/foodValueService";
import uuidService from "../services/uuidService";
import { Meals } from "./Meals";

export class LogDay {
  static empty() {
    return new LogDay();
  }

  id;
  timestamp;
  totalFoodValue;
  meals;

  constructor(id, timestamp, totalFoodValue, meals) {
    this.id = id ?? null;
    this.timestamp = timestamp ?? dateService.now();
    this.totalFoodValue = totalFoodValue ?? foodValueService.emptyFoodValue();
    this.meals = meals ?? this.#getEmptyMeals();
  }

  addEating(meal, rawEating) {
    const calculatedEating = this.#calculateEating(rawEating);
    this.meals[meal].eatings.push(calculatedEating);

    this.#updateMealTotals(meal);

    this.#updateDayTotals();
  }

  deleteEating(meal, removedEating) {
    this.meals[meal].eatings = this.meals[meal].eatings.filter(
      (eating) => eating.id !== removedEating.id
    );

    this.#updateMealTotals(meal);

    this.#updateDayTotals();
  }

  /* Calculate eating total food value ((foodvalue * servingSize) / 100) */
  #calculateEating({ dish, servingSize }) {
    return {
      id: uuidService.get(),
      dish: dish.toJsonSimple(),
      servingSize: servingSize,
      totalFoodValue: foodValueService.calculateFoodValueForPortion({
        dish,
        servingSize,
      }),
    };
  }

  #updateMealTotals(meal) {
    this.meals[meal].totalFoodValue = foodValueService.sumFoodValues(
      this.meals[meal].eatings.map((e) => e.totalFoodValue)
    );
  }

  #updateDayTotals() {
    const mealTotals = Object.keys(Meals).map(
      (meal) => this.meals[meal].totalFoodValue
    );

    this.totalFoodValue = foodValueService.sumFoodValues(mealTotals);
  }

  #getEmptyMeals() {
    return Object.keys(Meals).reduce((result, meal) => {
      result[meal] = {
        eatings: [],
        totalFoodValue: foodValueService.emptyFoodValue(),
      };
      return result;
    }, {});
  }
}

export const logDayConverter = {
  toFirestore: (logDay) => {
    return {
      id: logDay.id ?? null,
      timestamp: logDay.timestamp,
      totalFoodValue: logDay.totalFoodValue,
      meals: logDay.meals,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new LogDay(
      snapshot.id,
      data.timestamp,
      data.totalFoodValue,
      data.meals
    );
  },
};
