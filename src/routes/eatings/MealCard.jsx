import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import dateService from "../../services/dateService";
import FoodValue from "../../shared/FoodValue";

export const meals = {
  breakfast: {
    title: "🥪 Breakfast",
  },
  lunch: {
    title: "🍔 Lunch",
  },
  dinner: {
    title: "🍗 Dinner",
  },
  snack: {
    title: "🍟 Snack",
  },
};

function MealCard({ meal, day }) {
  const eatingFormPath = `/eatings/${dateService.format(day)}/${meal}`;

  return (
    <div className="box mb-3">
      <div className="columns is-vcentered is-mobile">
        <div className="column p-0">
          <div className="column">
            <div className="mb-1">
              <Link to={eatingFormPath} className="is-size-4">
                {meals[meal].title}
              </Link>
            </div>
            <div className="columns">
              <div className="column is-narrow">
                <FoodValue
                  foodValue={{
                    calories: 67.9,
                    carbs: 7.4,
                    fats: 1.9,
                    proteins: 5.3,
                  }}
                  className="is-flex-grow-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <Link to={eatingFormPath} className="button is-primary">
            <span className="icon">
              <FaPlus />
            </span>
            <span>Add</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
