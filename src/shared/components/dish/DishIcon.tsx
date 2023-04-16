import Dish from "@/shared/models/Dish";

function DishIcon({ dish = Dish.empty(), className }) {
  const renderedIcon =
    dish.ingredients && dish.ingredients.length > 0 ? "🥘" : "🥫";

  return <span className={"is-size-4 " + className}>{renderedIcon}</span>;
}

export default DishIcon;
