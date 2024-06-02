import FoodValue from "../FoodValue";
import { Dish } from "@/types/dish";
import DishTitle from "@/components/ui/DishTitle";

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
          <DishTitle dish={dish} />
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
