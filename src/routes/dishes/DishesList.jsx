import React, { Fragment } from "react";
import Dish from "./Dish";

function DishesList({ dishes }) {
  // Create overlay in "..." menu (Actions: Info, Delete)
  const foodValueLegend = {
    proteins: "Prot",
    fats: "Fat",
    carbs: "Carb",
    calories: "KCal",
  };

  return (
    <Fragment>
      {/* <div className="column is-half is-offset-half">
    <FoodValue foodValue={foodValueLegend} className="mr-6 mb-2" />
  </div> */}
      {dishes.map((dish) => (
        <div key={dish._id} className="block mb-3">
          <Dish dish={dish} />
        </div>
      ))}
    </Fragment>
  );
}

export default DishesList;
