import React, { Fragment, useState } from "react";
import Divider from "./Divider";

import Dish from "./Dish";

//TODO: 2 components:
// IngredientsList -- not clickable, props: onDelete, dishPortion, yellow bg??
// DishesList -- clickable, props: onClick, dish (render default serving size)
// DishTitle -- Dish + larger font
// Dish - title + subtitle + icon, props: dish, servingSize
function DishPortionListItem({ dish, servingSize, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const noName = dish.name === "";

  const toggleHover = () => setHovered(!hovered);
  const handleDeleteClick = () => {
    setActive(!active);
    onDelete(dish);
  };

  return (
    <div
      className={
        "has-background-warning-light" +
        (hovered ? " has-background-white-ter" : "") +
        (active ? " has-background-link-light" : "") +
        (noName ? " has-background-danger-light" : "")
      }
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className="p-4 is-flex is-align-items-center">
        <Dish dish={dish} servingSize={servingSize} />
        <div className="ml-2">
          <button
            className="delete is-medium"
            onClick={handleDeleteClick}
          ></button>
        </div>
      </div>
    </div>
  );
}

function DishPortionList({ dishPortions, onPortionDelete }) {
  const handleDelete = (dish) => {
    onPortionDelete(dish);
  };

  return (
    <Fragment>
      <Divider />

      {dishPortions.length === 0 && (
        <p className="has-text-centered mt-3">No ingredients.</p>
      )}

      {dishPortions.map((dishPortion, i) => (
        <Fragment key={i}>
          <DishPortionListItem
            dish={dishPortion.dish}
            servingSize={dishPortion.servingSize}
            onDelete={handleDelete}
          />
          <Divider />
        </Fragment>
      ))}
    </Fragment>
  );
}

export default DishPortionList;
