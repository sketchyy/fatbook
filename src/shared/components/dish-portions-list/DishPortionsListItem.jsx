import { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Form } from "react-router-dom";
import FoodValue from "../../FoodValue";

function DishPortionListItem({
  dishPortion,
  onSubmit,
  onDelete,
  submitBtn,
  isSubmitVisible,
  isDeleteVisible,
}) {
  const [size, setSize] = useState(
    dishPortion.servingSize ?? dishPortion.dish.defaultServingSize ?? ""
  );

  const handleInputChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddClick = () => {
    onSubmit({ ...dishPortion, servingSize: Number(size) });
  };

  const handleDeleteClick = () => {
    setSize(dishPortion.dish.defaultServingSize ?? "");
    onDelete(dishPortion);
  };

  return (
    <div className="pb-4 px-4">
      <div className="mb-4">
        <FoodValue
          className="is-size-7 is-justify-content-flex-start"
          foodValue={dishPortion.dish.foodValue}
        />
      </div>
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="is-flex is-align-items-end">
          {isDeleteVisible && isDeleteVisible(dishPortion) && (
            <button
              className="button is-danger mr-3"
              onClick={() => handleDeleteClick(dishPortion)}
            >
              <FaTimes />
            </button>
          )}
          <div className="is-flex-grow-1">
            <div className="field">
              <label className="label">Portion Size (g.)</label>
              <p className="control">
                <input
                  name="servingSize"
                  className="input"
                  type="number"
                  placeholder="g."
                  value={size}
                  onChange={handleInputChange}
                />
              </p>
            </div>
          </div>
          {isSubmitVisible && isSubmitVisible(dishPortion) && (
            <button
              className="button is-primary ml-3"
              onClick={() => handleAddClick(dishPortion)}
            >
              <FaPlus />
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default DishPortionListItem;
