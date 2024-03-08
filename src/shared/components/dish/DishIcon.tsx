import { Dish } from "@/types/dish";

type Props = {
  dish: Dish;
  className: string;
};

function DishIcon({ dish, className }: Props) {
  const renderedIcon =
    dish.ingredients && dish.ingredients.length > 0 ? "🥘" : "🥫";

  return <span className={"is-size-4 " + className}>{renderedIcon}</span>;
}

export default DishIcon;
