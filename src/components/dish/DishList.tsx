import React, { Fragment, useState } from "react";
import Divider from "../ui/Divider";
import DishInfo from "./DishInfo";
import { Dish } from "@/types/dish";
import DishListSkeleton from "@/components/ui/DishListSkeleton";

type ListItemProps = { dish: Dish; onClick: (dish: Dish) => void };

function DishListItem({ dish, onClick }: ListItemProps) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const noName = !dish.name;

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

type Props = {
  dishes: Dish[];
  isLoading?: boolean;
  onDishClick: (dish: Dish) => void;
};

function DishList({ dishes, isLoading, onDishClick }: Props) {
  if (isLoading) {
    return <DishListSkeleton />;
  }

  return (
    <>
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
    </>
  );
}

export default DishList;
