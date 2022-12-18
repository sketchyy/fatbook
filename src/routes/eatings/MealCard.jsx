import React from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import FoodValue from "../../shared/FoodValue";

function MealCard({ meal }) {
  return (
    <div className="box mb-3">
      <div className="columns is-vcentered is-mobile">
        <div className="column p-0">
          <div className="column">
            <Link to={`/dishes/`} className="is-size-4">
              {meal}
            </Link>
            <div className="columns">
              <div className="column is-narrow">
                <FoodValue
                  foodValue={{
                    calories: 67.9,
                    carbs: 7.4,
                    fats: 1.9,
                    proteins: 5.3,
                  }}
                  className="is-flex-grow-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <button className="button is-primary" type="submit">
            <span class="icon">
              <FaPlus />
            </span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealCard;
