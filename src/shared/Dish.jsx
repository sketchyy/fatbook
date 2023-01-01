import React from "react";
import FoodValue from "./FoodValue";

const foodValueLegend = {
  proteins: "Prot",
  fats: "Fat",
  carbs: "Carb",
  calories: "KCal",
};

function Dish({ dish, servingSize }) {
  const renderedName = dish.name || "<No Name>";
  const renderedIcon = dish.ingredients.length > 0 ? "🥘" : "🥫";

  return (
    <div className="is-flex-grow-1">
      <div className="is-flex is-align-items-center">
        <div className="is-size-4 mr-2">{renderedIcon}</div>
        <div className="is-flex-grow-1">
          <p className=" title is-6 pb-1">{renderedName}</p>
          <p className=" subtitle is-7">
            <span className="is-flex is-justify-content-space-between">
              <span>
                <FoodValue foodValue={dish.foodValue} />
              </span>
              {servingSize && <span>{servingSize} g.</span>}
            </span>

            {/* Proteins: {dish.foodValue?.proteins || "N/A"} g. | Fats:{" "}
                  {dish.foodValue?.fats || "N/A"} g. | Carbs:{" "}
                  {dish.foodValue?.carbs || "N/A"} g. */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dish;
