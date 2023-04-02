import React from "react";
import Dish from "../../models/Dish";

function DishIcon({ dish = Dish.empty(), className }) {
  const renderedIcon =
    dish.ingredients && dish.ingredients.length > 0 ? "🥘" : "🥫";

  return <span className={"is-size-4 " + className}>{renderedIcon}</span>;
}

export default DishIcon;
