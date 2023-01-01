import React from "react";

const foodValueLegend = {
  proteins: "Prot",
  fats: "Fat",
  carbs: "Carb",
  calories: "KCal",
};

function Dish({ dish, servingSize }) {
  const renderedName = dish.name || "<No Name>";
  const renderedServingSize = servingSize ?? dish.defaultServingSize ?? "n/a";

  return (
    <div className="is-flex-grow-1">
      <p className=" title is-6">{renderedName}</p>
      <p className=" subtitle is-7">
        <div>
          {renderedServingSize} g. | {dish.foodValue?.calories || "N/A"} kcal
        </div>
        <div>
          {/* Proteins: {dish.foodValue?.proteins || "N/A"} g. | Fats:{" "}
              {dish.foodValue?.fats || "N/A"} g. | Carbs:{" "}
              {dish.foodValue?.carbs || "N/A"} g. */}
        </div>
      </p>
    </div>
  );
}

export default Dish;
