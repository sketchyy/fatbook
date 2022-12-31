import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import DishListItem from "../../../shared/DishListItem";

function DishesList({ dishes }) {
  const navigate = useNavigate();
  // TODO: Create tooltip in "..." menu (Actions: Info, Delete)
  const foodValueLegend = {
    proteins: "Prot",
    fats: "Fat",
    carbs: "Carb",
    calories: "KCal",
  };

  const handleDishClick = (dish) => {
    navigate(`/dishes/${dish._id}`);
  };

  return (
    <Fragment>
      {dishes.map((dish) => (
        <DishListItem key={dish._id} dish={dish} onClick={handleDishClick} />
      ))}
    </Fragment>
  );
}

export default DishesList;
