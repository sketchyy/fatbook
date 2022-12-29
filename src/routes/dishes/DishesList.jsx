import React, { Fragment } from "react";
import Dish from "./Dish";

export async function createDishAction() {
  // console.log('params');
  // const contact = await dbService.createDish();
  // return { contact };
}

function DishesList({ dishes }) {
  // TODO: Create tooltip in "..." menu (Actions: Info, Delete)
  const foodValueLegend = {
    proteins: "Prot",
    fats: "Fat",
    carbs: "Carb",
    calories: "KCal",
  };

  return (
    <Fragment>
      {dishes.map((dish) => (
        <div key={dish._id} className="block mb-3">
          <Dish dish={dish} />
        </div>
      ))}
    </Fragment>
  );
}

export default DishesList;
