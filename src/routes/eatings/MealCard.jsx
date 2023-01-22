import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
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

function MealCard({ meal, children }) {
  const { day, logDay } = useOutletContext();
  const eatingPath = `/eatings/${dateService.format(day)}/${meal}`;
  const addEatingFormPath = eatingPath + "/add";
  const isSummary = meal === "summary";
  const foodValue = isSummary
    ? logDay.totalFoodValue
    : logDay.meals[meal].totalFoodValue;

  const renderMealName = () =>
    isSummary ? (
      <span className="is-size-4">Summary</span>
    ) : (
      <Link to={eatingPath} className="is-size-4">
        {meals[meal].title}
      </Link>
    );

  const renderActionControl = () =>
    isSummary ? (
      children
    ) : (
      <Link to={addEatingFormPath} className="button is-primary">
        <span className="icon">
          <FaPlus />
        </span>
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
            foodValue={foodValue}
            className="is-flex-grow-1 is-size-6"
          />
        </div>
      </div>
    </div>
  );
}

export default MealCard;
