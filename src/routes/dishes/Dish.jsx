import React from "react";
import { FaEllipsisV, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Dropdown from "../../shared/Dropdown";
import FoodValue from "../../shared/FoodValue";

function Dish({ dish, onDelete }) {
  const menuItems = [
    {
      label: "Delete",
      icon: <FaTrash />,
      command: () => {
        onDelete(dish._id);
      },
    },
  ];

  const dropdownTriggerTemplate = () => (
    <span className="icon is-small">
      <FaEllipsisV />
    </span>
  );

  return (
    <div className="box">
      <div className="columns is-vcentered is-mobile">
        <div className="column">
          <div className="column">
            <span className="mr-2 is-size-3">🍲</span>
            <Link to={`/dishes/${dish._id}`} className="is-size-4">
              {dish.name}
            </Link>
            <div className="columns">
              <div className="column">
                {dish.defaultServingSize && (
                  <p className="subtitle">{dish.defaultServingSize} g.</p>
                )}
              </div>
              <div className="column is-narrow">
                <FoodValue
                  foodValue={dish.foodValue}
                  className="is-flex-grow-1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="column is-narrow">
          <Dropdown
            menuItems={menuItems}
            className="is-right"
            dropdownTriggerTemplate={dropdownTriggerTemplate}
          />
        </div>
      </div>
    </div>
  );
}

export default Dish;
