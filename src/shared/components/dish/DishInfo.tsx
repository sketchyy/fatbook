import Dish from "@/shared/models/Dish";
import FoodValue from "../FoodValue";
import DishIcon from "./DishIcon";

interface DishInfoProps {
  dish: Dish;
  servingSize?: number;
}

function DishInfo({ dish, servingSize }: DishInfoProps) {
  const renderedName = dish.name || "<No Name>";

  return (
    <div className="is-flex-grow-1">
      <div className="is-flex is-align-items-center">
        <div className="is-flex-grow-1">
          <p className="title is-6 pb-1 is-flex is-align-items-center">
            <DishIcon className="mr-2" dish={dish} />
            <span data-testid="dishListName">{renderedName}</span>
          </p>
          <p className=" subtitle is-7">
            <span className="is-flex is-justify-content-space-between">
              <span>
                <FoodValue foodValue={dish.foodValue} />
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
