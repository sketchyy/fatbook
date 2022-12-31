import React, { useState } from "react";

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
        "is-clickable " +
        (hovered ? " has-background-white-ter" : "") +
        (active ? " has-background-link-light" : "") +
        (noName ? " has-background-danger-light" : "")
      }
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      onClick={handleClick}
    >
      <div className="py-4 pl-2">
        {/* TODO: Dish > render name, foodvalue, serving size, smaller font */}
        {/* TODO: DishTitle > bigger font */}
        {/* TODO: DishListItem >  + <hr> + hover/click animation + emoji + delete action - use in dishes, ingredients, eatings */}
        <p className=" title is-6">{dish.name || "<No Name>"}</p>
        <p className=" subtitle is-7">
          <div>
            {dish.defaultServingSize || "N/A"} g. /{" "}
            {dish.foodValue?.calories || "N/A"} kcal
          </div>
          <div>
            {/* Proteins: {dish.foodValue?.proteins || "N/A"} g. | Fats:{" "}
            {dish.foodValue?.fats || "N/A"} g. | Carbs:{" "}
            {dish.foodValue?.carbs || "N/A"} g. */}
          </div>
        </p>
      </div>
      <hr className="has-background-dark my-0" />
    </div>
  );
}

export default DishListItem;
