import React from "react";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";
import FoodValue from "../../shared/FoodValue";

function Dish({ dish }) {
  return (
    <div className="box">
      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <div className="column">
            <Link to={`/dishes/${dish._id}`} className="is-size-4">
              {dish.name}
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
        <div className="column is-narrow">
          <button className="button">
            <span className="icon is-small">
              <FaEllipsisV />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dish;
