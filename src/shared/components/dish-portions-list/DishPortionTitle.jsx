import { FaCheckCircle } from "react-icons/fa";
import DishIcon from "../../DishIcon";

function DishPortionTitle({ dishPortion }) {
  const noName = dishPortion.dish.name === "";

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
            <DishIcon className="mr-2" dish={dishPortion.dish} />
            <div className="is-flex-grow-1">{dishPortion.dish.name}</div>
            <div className="is-size-5">
              {dishPortion.selected ? (
                <FaCheckCircle className="has-text-success" />
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishPortionTitle;
