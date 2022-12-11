import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import FoodValue from "../../shared/FoodValue";

function Dish({ dish }) {
  return (
    <div className="box columns">
      <div className="column is-half-desktop is-full-mobile">
        <p className="title is-size-4	">{dish.name}</p>
        {dish.defaultServingSize && (
          <p className="subtitle">{dish.defaultServingSize} g.</p>
        )}
      </div>
      <div className="column is-half-desktop is-full-mobile is-flex is-align-items-center">
        <FoodValue
          foodValue={dish.foodValue}
          className="is-flex-grow-1 mr-4 mb-0"
        />
        <button className="button">
          <span className="icon is-small">
            <FaEllipsisV />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Dish;
