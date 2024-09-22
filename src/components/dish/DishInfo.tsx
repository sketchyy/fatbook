import FoodValue from "../FoodValue";
import { Dish } from "@/types/dish";
import DishTitle from "@/components/ui/DishTitle";
import { SHARED_COLLECTION_ID } from "@/constants";
import { FaUsers } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

type Props = {
  dish: Dish;
};

function DishInfo({ dish }: Props) {
  const isShared = dish.collectionId === SHARED_COLLECTION_ID;

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
              {isShared && (
                <span
                  className="icon"
                  data-tooltip-id="shared-tooltip"
                  data-tooltip-content="This dish is shared between all users"
                >
                  <FaUsers />
                  <Tooltip id="shared-tooltip" place="left" />
                </span>
              )}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default DishInfo;
