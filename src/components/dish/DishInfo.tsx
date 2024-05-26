import FoodValue from "../FoodValue";
import DishIcon from "./DishIcon";
import { Dish } from "@/types/dish";

type Props = {
  dish: Dish;
  servingSize?: number;
};

function DishInfo({ dish, servingSize }: Props) {
  const renderedName = dish.name || "<No Name>";

  return (
    <div className="is-flex-grow-1">
      <div className="is-flex is-align-items-center">
        <div className="is-flex-grow-1">
          <p className="title has-text-weight-semibold is-6 mb-2 is-flex is-align-items-center">
            <DishIcon className="mr-2" dish={dish} />
            <span data-testid="dishListName">{renderedName}</span>
          </p>
          <p className=" subtitle is-7">
            <span className="is-flex is-justify-content-space-between">
              <span>
                <FoodValue source={dish} />
              </span>
              {servingSize && <span>{servingSize} g.</span>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DishInfo;
