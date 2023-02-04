import { Fragment, useState } from "react";
import { FaCheckCircle, FaPlus, FaTimes } from "react-icons/fa";
import { Form } from "react-router-dom";
import DishIcon from "../dish/DishIcon";
import FoodValue from "../FoodValue";
import Accordion, { AccordionItem } from "../ui/Accordion";
import Divider from "../ui/Divider";

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

function DishPortionsList({
  dishPortions,
  onSubmit,
  onDelete,
  submitBtn,
  isSubmitVisible,
  isDeleteVisible,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSubmit = (portion) => {
    setActiveIndex(-1);
    onSubmit(portion);
  };

  const handleDelete = (portion) => {
    setActiveIndex(-1);
    onDelete(portion);
  };

  return (
    <Fragment>
      <Divider />

      {dishPortions.length === 0 && (
        <p className="has-text-centered mt-3">Nothing was found.</p>
      )}

      <Accordion
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {dishPortions.map((dishPortion, i) => (
          <AccordionItem
            key={dishPortion.dish.id + "-" + i}
            title={<DishPortionTitle dishPortion={dishPortion} />}
            className={
              dishPortion.selected ? "has-background-success-light" : ""
            }
          >
            <DishPortionListItem
              dishPortion={dishPortion}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              submitBtn={submitBtn}
              isSubmitVisible={isSubmitVisible}
              isDeleteVisible={isDeleteVisible}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default DishPortionsList;
