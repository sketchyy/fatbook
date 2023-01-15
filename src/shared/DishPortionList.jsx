import React, { Fragment, useState } from "react";
import Divider from "./Divider";

import DishInfo from "./DishInfo";

//TODO: 2 components:
// IngredientsList -- not clickable, props: onDelete, dishPortion, yellow bg??
// DishesList -- clickable, props: onClick, dish (render default serving size)
// DishTitle -- Dish + larger font
// Dish - title + subtitle + icon, props: dish, servingSize
function DishPortionListItem({ dishPortion, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const { dish, servingSize } = dishPortion;
  const noName = dish.name === "";

  const toggleHover = () => setHovered(!hovered);
  const handleDeleteClick = () => {
    setActive(!active);
    onDelete(dishPortion);
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
        <DishInfo dish={dish} servingSize={servingSize} />
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

function DishPortionList({ dishPortions, onPortionDelete, emptyMessage }) {
  const handleDelete = (id) => {
    onPortionDelete(id);
  };

  return (
    <Fragment>
      <Divider />

      {dishPortions.length === 0 && (
        <p className="has-text-centered mt-3">{emptyMessage}</p>
      )}

      {dishPortions.map((dishPortion, i) => (
        <Fragment key={i}>
          <DishPortionListItem
            dishPortion={dishPortion}
            onDelete={handleDelete}
          />
          <Divider />
        </Fragment>
      ))}
    </Fragment>
  );
}

export default DishPortionList;
