import React from "react";
import DishIcon from "./DishIcon";
import FoodValue from "./FoodValue";

function DishInfo({ dish, servingSize }) {
  const renderedName = dish.name || "<No Name>";

  return (
    <div className="is-flex-grow-1">
      <div className="is-flex is-align-items-center">
        <DishIcon className="mr-2" dish={dish} />
        <div className="is-flex-grow-1">
          <p className=" title is-6 pb-1">{renderedName}</p>
          <p className=" subtitle is-7">
            <span className="is-flex is-justify-content-space-between">
              <span>
                <FoodValue foodValue={dish.foodValue} />
              </span>
              {servingSize && <span>{servingSize} g.</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DishInfo;
