import { Fragment, useRef, useState } from "react";
import { FaCheck, FaCheckCircle, FaPlus, FaTimes } from "react-icons/fa";
import { Form } from "react-router-dom";
import { DishPortion } from "../../models/DishPortion";
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
                    foodValue={
                      dishPortion.servingSize
                        ? dishPortion.totalFoodValue
                        : dishPortion.dish.foodValue
                    }
                  />
                  {dishPortion.servingSize && (
                    <strong className="is-size-7">
                      ⚖️ {dishPortion.servingSize} g.
                    </strong>
                  )}
                  {!dishPortion.servingSize && (
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

interface DishPortionsListItemProps {
  focused: boolean;
  dishPortion: DishPortion;
  onAdd: (p: DishPortion) => void;
  onUpdate: (p: DishPortion) => void;
  onDelete: (p: DishPortion) => void;
  isAdded: (p: DishPortion) => boolean;
}

function DishPortionListItem({
  focused,
  dishPortion,
  onAdd,
  onUpdate,
  onDelete,
  isAdded,
}: DishPortionsListItemProps) {
  const [size, setSize] = useState(
    dishPortion.servingSize ?? dishPortion.dish.defaultServingSize ?? ""
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddClick = () => {
    onAdd({ ...dishPortion, servingSize: Number(size) });
  };

  const handleUpdateClick = () => {
    onUpdate({ ...dishPortion, servingSize: Number(size) });
  };

  const handleDeleteClick = () => {
    setSize(dishPortion.dish.defaultServingSize ?? "");
    onDelete(dishPortion);
  };

  if (inputRef.current && focused) {
    inputRef.current.focus();
  }

  return (
    <div className="pb-4 px-4">
      <Form onSubmit={(e) => e.preventDefault()}>
        <div className="is-flex is-align-items-end">
          {isAdded(dishPortion) && (
            <button
              className="button is-danger mr-3"
              onClick={() => handleDeleteClick()}
            >
              <FaTimes />
            </button>
          )}
          <div className="is-flex-grow-1">
            <div className="field">
              <label className="label">Portion Size (g.)</label>
              <p className="control">
                <input
                  ref={inputRef}
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
          {!isAdded(dishPortion) && (
            <button
              className="button is-primary ml-3"
              onClick={() => handleAddClick()}
            >
              <FaPlus />
            </button>
          )}
          {isAdded(dishPortion) && (
            <button
              className="button is-primary ml-3"
              onClick={() => handleUpdateClick()}
            >
              <FaCheck />
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}

interface DishPortionsListProps {
  dishPortions: DishPortion[];
  onAdd?: (p: DishPortion) => void;
  onUpdate: (p: DishPortion) => void;
  onDelete: (p: DishPortion) => void;
  isAdded: (p: DishPortion) => boolean;
}

function DishPortionsList({
  dishPortions,
  onAdd,
  onUpdate,
  onDelete,
  isAdded,
}: DishPortionsListProps) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAdd = (portion) => {
    setActiveIndex(-1);
    if (onAdd) {
      onAdd(portion);
    }
  };

  const handleUpdate = (portion) => {
    setActiveIndex(-1);
    onUpdate(portion);
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
              "has-border-bottom-grey " +
              (dishPortion.selected ? "has-background-success-light" : "")
            }
            selectedClassName="has-background-info-light"
          >
            <DishPortionListItem
              focused={i === activeIndex}
              dishPortion={dishPortion}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isAdded={isAdded}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default DishPortionsList;
