import React from "react";
import FoodValue from "../../shared/FoodValue";

function DaySummaryCard(props) {
  return (
    <div className="box mb-3">
      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <h2 className="title is-4 mb-2">Summary</h2>
        </div>
        <div className="column is-narrow">
          <input type="date" className="input" />
        </div>
      </div>
      <div className="columns is-mobile">
        <div className="column is-8-mobile is-4-desktop ">
          <FoodValue
            foodValue={{
              calories: 67.9,
              carbs: 7.4,
              fats: 1.9,
              proteins: 5.3,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DaySummaryCard;
