import React from "react";

function FoodValue({ foodValue, className = "" }) {
  return (
    <div className={"tabs " + className}>
      <span className="tag is-rounded is-info is-medium has-text-weight-bold">
        {foodValue.proteins}
      </span>
      <span className="tag is-rounded is-info is-medium has-text-weight-bold">
        {foodValue.fats}
      </span>
      <span className="tag is-rounded is-info is-medium has-text-weight-bold">
        {foodValue.carbs}
      </span>
      <span className="tag is-rounded is-success is-medium has-text-weight-bold">
        {foodValue.calories}
      </span>
    </div>
  );
}

export default FoodValue;
