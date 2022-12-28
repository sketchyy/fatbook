import React, { Fragment } from "react";
import dbService from "../../core/firebase/dbService";
import Dish from "./Dish";

function DishesList({ dishes }) {
  // Create overlay in "..." menu (Actions: Info, Delete)
  const foodValueLegend = {
    proteins: "Prot",
    fats: "Fat",
    carbs: "Carb",
    calories: "KCal",
  };
  const handleDishDelete = async (id) => dbService.deleteDish(id);

  return (
    <Fragment>
      {/* <div className="column is-half is-offset-half">
    <FoodValue foodValue={foodValueLegend} className="mr-6 mb-2" />
  </div> */}
      {dishes.map((dish) => (
        <div key={dish._id} className="block mb-3">
          <Dish dish={dish} onDelete={handleDishDelete} />
        </div>
      ))}
    </Fragment>
  );
}

export default DishesList;
