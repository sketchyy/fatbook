import { FaCheckCircle } from "react-icons/fa";
import DishIcon from "../../dish/DishIcon";
import FoodValue from "../../FoodValue";
import { DishPortion } from "@/types/dish-portion";

type Props = {
  dishPortion: DishPortion;
};

function DishPortionTitle({ dishPortion }: Props) {
  const noName = !dishPortion.dish.name;

  return (
    <div
      className={
        "is-clickable" +
        // (hovered ? " has-background-white-ter" : "") +
        (noName ? " has-background-danger-light" : "")
      }
    >
      <div className="py-4 px-2">
        <div className="is-flex-grow-1">
          <div className="is-flex is-align-items-center">
            <div className="is-flex-grow-1">
              <div>
                <div className="mb-1 is-flex is-align-items-center">
                  <DishIcon className="mr-2" dish={dishPortion.dish} />
                  <div className="is-flex-grow-1">{dishPortion.dish.name}</div>
                  {dishPortion.selected ? (
                    <FaCheckCircle className="has-text-success is-size-4" />
                  ) : (
                    ""
                  )}
                </div>
                <div className="is-flex is-justify-content-space-between">
                  <FoodValue
                    className="mb-0 is-size-7 is-justify-content-flex-start"
                    proteins={dishPortion.proteins}
                    fats={dishPortion.fats}
                    carbs={dishPortion.carbs}
                    calories={dishPortion.calories}
                  />
                  {dishPortion.portion && (
                    <strong className="is-size-7">
                      ⚖️ {dishPortion.portion} g.
                    </strong>
                  )}
                  {!dishPortion.portion && (
                    <strong className="is-size-7">per 100 g.</strong>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishPortionTitle;
