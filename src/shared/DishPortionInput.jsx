import React, { Fragment, useEffect, useState } from "react";
import { FaCheckCircle, FaPlus, FaTimes } from "react-icons/fa";
import { Form } from "react-router-dom";
import Accordion, { AccordionItem } from "./Accordion";
import DishIcon from "./DishIcon";
import Divider from "./Divider";
import FoodValue from "./FoodValue";

function DishPortionInput({ dishes, onSelectionChange }) {
  const [dishPortions, setDishPortions] = useState([]);
  const [selectedPortions, setSelectedPortions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  // TODO: you might not need useEffect
  useEffect(() => {
    const selectedIds = selectedPortions.map((portion) => portion.dish.id);
    const portionsFromDishes = dishes
      .filter((dish) => !selectedIds.includes(dish.id))
      .map((dish) => ({
        dish: dish,
        servingSize: null,
      }));
    setDishPortions([...selectedPortions, ...portionsFromDishes]);
  }, [dishes, selectedPortions]);

  const handleAddClick = (portion) => {
    portion.selected = true;
    const updatedSelectedPortions = [...selectedPortions, portion];

    setSelectedPortions(updatedSelectedPortions);
    onSelectionChange(updatedSelectedPortions);
    setActiveIndex(-1);
  };

  const handleDeleteClick = (portion) => {
    portion.selected = false;
    const updatedSelectedPortions = selectedPortions.filter(
      (p) => p.dish.id !== portion.dish.id
    );

    setSelectedPortions(updatedSelectedPortions);
    onSelectionChange(updatedSelectedPortions);
    setActiveIndex(-1);
  };

  return (
    <Fragment>
      <Divider />

      {dishes.length === 0 && (
        <p className="has-text-centered mt-3">Nothing was found.</p>
      )}

      <Accordion
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {dishPortions.map((dishPortion) => (
          <AccordionItem
            key={dishPortion.dish.id}
            title={<DishPortionTitle dishPortion={dishPortion} />}
            className={
              dishPortion.selected ? "has-background-success-light" : ""
            }
          >
            <DishPortionInputItem
              dishPortion={dishPortion}
              onAdd={handleAddClick}
              onDelete={handleDeleteClick}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </Fragment>
  );
}

function DishPortionTitle({ dishPortion }) {
  // const [hovered, setHovered] = useState(false);
  const noName = dishPortion.dish.name === "";

  // const toggleHover = () => setHovered(!hovered);

  return (
    <div
      className={
        "is-clickable" +
        // (hovered ? " has-background-white-ter" : "") +
        (noName ? " has-background-danger-light" : "")
      }
      // onMouseEnter={toggleHover}
      // onMouseLeave={toggleHover}
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

function DishPortionInputItem({ dishPortion, onAdd, onDelete }) {
  const [size, setSize] = useState(dishPortion.dish.defaultServingSize ?? "");

  const handleInputChange = (e) => {
    setSize(e.target.value);
  };

  const handleAddClick = () => {
    onAdd({ ...dishPortion, servingSize: Number(size) });
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
        <label className="label is-small">Portion Size (g.)</label>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <input
              name="servingSize"
              className="input is-small"
              type="number"
              placeholder="g."
              value={size}
              onChange={handleInputChange}
              autoFocus={true}
            />
          </p>
          <p className="control">
            {dishPortion.selected ? (
              <button
                className="button is-danger is-small"
                onClick={handleDeleteClick}
              >
                <FaTimes />
              </button>
            ) : (
              <button
                className="button is-primary is-small"
                onClick={handleAddClick}
              >
                <FaPlus />
              </button>
            )}
          </p>
        </div>
      </Form>
    </div>
  );
}

export default DishPortionInput;
