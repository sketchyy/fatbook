import dateService from "../services/dateService";
import foodValueService from "../services/foodValueService";
import { Meals } from "./Meals";
import { DishPortion } from "@/shared/models/DishPortion";

export class LogDay {
  static empty() {
    return new LogDay(null, null, null, null);
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

  addEatings(meal, rawEatings) {
    const calculatedEatings = rawEatings.map((rawEating: DishPortion) =>
      this.#calculateEating(rawEating),
    );
    this.meals[meal].eatings =
      this.meals[meal].eatings.concat(calculatedEatings);

    this.#updateMealTotals(meal);

    this.#updateDayTotals();
  }

  deleteEating(meal, removedEating) {
    this.meals[meal].eatings = this.meals[meal].eatings.filter(
      (eating) => eating.id !== removedEating.id,
    );

    this.#updateMealTotals(meal);

    this.#updateDayTotals();
  }

  updateEating(meal, updatedEating) {
    const calculatedEatings = this.#calculateEating(updatedEating);

    this.meals[meal].eatings.forEach((eating, i) => {
      if (eating.id === updatedEating.id) {
        this.meals[meal].eatings[i] = calculatedEatings;
      }
    });

    this.#updateMealTotals(meal);

    this.#updateDayTotals();
  }

  /* Calculate eating total food value ((foodvalue * servingSize) / 100) */
  #calculateEating({ id, dish, servingSize }) {
    return {
      id: id,
      dish: dish.toJsonSimple ? dish.toJsonSimple() : dish,
      servingSize: servingSize,
      totalFoodValue: foodValueService.calculateFoodValueForPortion({
        dish,
        servingSize,
      }),
    };
  }

  #updateMealTotals(meal) {
    this.meals[meal].totalFoodValue = foodValueService.sumFoodValues(
      this.meals[meal].eatings.map((e) => e.totalFoodValue),
    );
  }

  #updateDayTotals() {
    const mealTotals = Object.keys(Meals).map(
      (meal) => this.meals[meal].totalFoodValue,
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
      data.meals,
    );
  },
};
