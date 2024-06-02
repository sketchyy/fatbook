import React, { ReactNode } from "react";
import DishIcon from "@/components/dish/DishIcon";
import { Dish } from "@/types/dish";
import { SimplifiedDish } from "@/types/dish-portion";

const IconSkeleton = () => (
  <p
    className="image is-32x32 is-skeleton mr-2"
    style={{ width: 27, height: 27 }}
  >
    Icon
  </p>
);

const TextSkeleton = () => (
  <h2 className="subtitle is-skeleton" style={{ height: 18, width: 200 }}>
    Dish Name
  </h2>
);

type Props = {
  dish?: Dish | SimplifiedDish;
  isLoading?: boolean;
  children?: ReactNode;
};

export default function DishTitle({ dish, isLoading, children }: Props) {
  const renderedName = dish?.name || "<No Name>";
  const wrapperClass =
    "title has-text-weight-semibold is-6 mb-2 is-flex is-align-items-center";

  if (isLoading) {
    return (
      <p className={wrapperClass}>
        <IconSkeleton />
        <TextSkeleton />
      </p>
    );
  }

  return (
    <p className={wrapperClass}>
      <DishIcon className="mr-2" dish={dish} />
      <div className="is-flex-grow-1">{renderedName}</div>
      {children}
    </p>
  );
}
