import React, { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { mockDishes } from "../../mock-dishes";
import DishNote from "../../shared/DishNote";

function DishIngredientsForm(props) {
  const navigate = useNavigate();
  const [newDish, setNewDish] = useState({
    name: "",
    servingSize: "",
  });
  const [dishes, setDishes] = useState(mockDishes);

  const handleNewDishChange = ({ target }) => {
    setNewDish({
      ...newDish,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding...", e);
    //  Mock impl:
    const newDishes = [
      ...dishes,
      { name: newDish.name, defaultServingSize: newDish.servingSize },
    ];
    setDishes(newDishes);
  };

  return (
    <Fragment>
      <div className="box">
        <form onSubmit={handleSubmit} className="block">
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                name="name"
                className="input"
                type="text"
                value={newDish.name}
                onChange={handleNewDishChange}
              />
            </div>
          </div>

          <label className="label">Portion Size</label>
          <div className="field is-grouped">
            <p className="control is-expanded">
              <input
                name="servingSize"
                className="input"
                type="number"
                placeholder="gramms"
                value={newDish.servingSize}
                onChange={handleNewDishChange}
              />
            </p>
            <p className="control">
              <button className="button is-primary" type="submit">
                <span className="icon">
                  <FaPlus />
                </span>
                <span>Add</span>
              </button>
            </p>
          </div>
        </form>
      </div>
      <div className="block">
        {dishes.map((dish) => (
          <DishNote key={dish._id} dish={dish} />
        ))}
      </div>
    </Fragment>
  );
}

export default DishIngredientsForm;
