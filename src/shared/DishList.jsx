import React, { Fragment, useState } from "react";
import DishInfo from "./DishInfo";
import Divider from "./Divider";

//TODO: 2 components:
// IngredientsList -- not clickable, props: onDelete, dishPortion, yellow bg??
// DishesList -- clickable, props: onClick, dish (render default serving size)
// DishTitle -- Dish + larger font
// Dish - title + subtitle + icon, props: dish, servingSize
function DishListItem({ dish, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const noName = dish.name === "";

  const toggleHover = () => setHovered(!hovered);
  const handleClick = () => {
    setActive(!active);
    onClick(dish);
  };

  return (
    <div
      className={
        "is-clickable" +
        (hovered ? " has-background-white-ter" : "") +
        (active ? " has-background-link-light" : "") +
        (noName ? " has-background-danger-light" : "")
      }
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={handleClick}
    >
      <div className="py-4 px-2">
        <DishInfo dish={dish} />
      </div>
    </div>
  );
}

function DishList({ dishes, onDishClick }) {
  return (
    <Fragment>
      <Divider />

      {dishes.length === 0 && (
        <p className="has-text-centered mt-3">Nothing was found.</p>
      )}

      {dishes.map((dish) => (
        <Fragment key={dish.id}>
          <DishListItem dish={dish} onClick={() => onDishClick(dish)} />
          <Divider />
        </Fragment>
      ))}
    </Fragment>
  );
}

export default DishList;
