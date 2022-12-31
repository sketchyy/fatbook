import React from "react";

function FoodValue({ foodValue = {}, className = "" }) {
  return (
    <div className={"tabs " + className}>
      <span className="tag is-rounded is-info has-text-weight-bold mr-2">
        {foodValue.proteins || "n/a"}
      </span>
      <span className="tag is-rounded is-info has-text-weight-bold mr-2">
        {foodValue.fats || "n/a"}
      </span>
      <span className="tag is-rounded is-info has-text-weight-bold mr-2">
        {foodValue.carbs || "n/a"}
      </span>
      <span className="tag is-rounded is-success has-text-weight-bold">
        {foodValue.calories || "n/a"}
      </span>
    </div>
  );
}

export default FoodValue;
