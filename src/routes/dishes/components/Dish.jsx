import React from "react";
import { Link } from "react-router-dom";
import FoodValue from "../../../shared/FoodValue";

function Dish({ dish }) {
  const isNewDish = dish.name === "";
  const containerClassName = isNewDish
    ? "notification is-light is-success"
    : "box";

  return (
    <div className={containerClassName}>
      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <div className="column">
            <span className="mr-2 is-size-3">🍲</span>
            <Link to={`/dishes/${dish._id}`} className="is-size-4">
              {dish.name || "<New Dish>"}
            </Link>
            <div className="columns">
              <div className="column">
                {dish.defaultServingSize && (
                  <p className="subtitle">{dish.defaultServingSize} g.</p>
                )}
              </div>
              <div className="column is-narrow">
                <FoodValue
                  foodValue={dish.foodValue}
                  className="is-flex-grow-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dish;
