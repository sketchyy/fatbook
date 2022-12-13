import React from "react";

function FoodValue({ foodValue, className = "" }) {
  return (
    <div className={"tabs " + className}>
      <span className="tag is-rounded is-info has-text-weight-bold mr-2">
        {foodValue.proteins}
      </span>
      <span className="tag is-rounded is-info has-text-weight-bold mr-2">
        {foodValue.fats}
      </span>
      <span className="tag is-rounded is-info has-text-weight-bold mr-2">
        {foodValue.carbs}
      </span>
      <span className="tag is-rounded is-success has-text-weight-bold">
        {foodValue.calories}
      </span>
    </div>
  );
}

export default FoodValue;
