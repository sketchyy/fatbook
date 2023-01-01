import React from "react";

function FoodValue({ foodValue = {}, className = "" }) {
  return (
    <div className={"level " + className}>
      <span className="mr-2">⚡ {foodValue.calories || "n/a"} kcal</span>
      <span className="mr-2">🥩 {foodValue.proteins || "n/a"} g.</span>
      <span className="mr-2">🧈 {foodValue.fats || "n/a"} g.</span>
      <span className="mr-2">🍚 {foodValue.carbs || "n/a"} g.</span>
    </div>
  );
}

export default FoodValue;
