import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import FoodValue from "../../shared/FoodValue";
import dateService from "../../shared/services/dateService";

export const meals = {
  summary: {
    icon: "📝",
    title: "Summary",
  },
  breakfast: {
    icon: "🥪",
    title: "Breakfast",
  },
  lunch: {
    icon: "🍔",
    title: "Lunch",
  },
  dinner: {
    icon: "🍗",
    title: "Dinner",
  },
  snack: {
    icon: "🍟",
    title: "Snack",
  },
};

function MealCard({ meal, day, children }) {
  const eatingFormPath = `/eatings/${dateService.format(day)}/${meal}`;
  const isSummary = meal === "summary";

  const renderMealName = () =>
    isSummary ? (
      <span className="is-size-4">Summary</span>
    ) : (
      <Link to={eatingFormPath} className="is-size-4">
        {meals[meal].title}
      </Link>
    );

  const renderActionControl = () =>
    isSummary ? (
      children
    ) : (
      <Link to={eatingFormPath} className="button is-primary">
        <span className="icon">
          <FaPlus />
        </span>
        <span>Add</span>
      </Link>
    );
  return (
    <div className="box mb-3">
      <div className="mb-3 is-flex is-align-items-center">
        <div className="is-flex-grow-1">
          <div className="mb-1 is-flex is-align-items-center">
            <span className="is-size-3 mr-3">{meals[meal].icon}</span>
            {renderMealName()}
          </div>
        </div>
        <div>{renderActionControl()}</div>
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
            className="is-flex-grow-1 is-size-6"
          />
        </div>
      </div>
    </div>
  );
}

export default MealCard;
