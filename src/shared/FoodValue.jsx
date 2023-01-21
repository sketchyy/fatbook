import React from "react";

function FoodValue({ foodValue = {}, className = "" }) {
  const format = (val) => (val ? Math.round(val) : "n/a");

  return (
    <span className={"level " + className}>
      <span className="mr-2">⚡ {format(foodValue.calories)} kcal</span>
      <span className="mr-2">🥩 {format(foodValue.proteins)} g</span>
      <span className="mr-2">🧈 {format(foodValue.fats)} g</span>
      <span className="mr-2">🍚 {format(foodValue.carbs)} g</span>
    </span>
  );
}

export default FoodValue;
