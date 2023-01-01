import React, { Fragment, useState } from "react";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { mockDishes } from "../../mock-dishes";
import FoodValue from "../../shared/FoodValue";
import { meals } from "../eatings/MealCard";

function EatingForm(props) {
  const navigate = useNavigate();
  const { day, meal } = useParams();

  console.log("Loc ", day, meal);
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
        <div className="columns is-mobile is-vcentered">
          <div className="column is-narrow">
            <button className="button is-is-light" onClick={() => navigate(-1)}>
              <span className="icon">
                <FaChevronLeft />
              </span>
            </button>
          </div>
          <div className="column">
            <h1 className="title is-4">{meals[meal].title}</h1>
            <h2 className="subtitle is-6">{day}</h2>
          </div>
        </div>
        <div className="field">
          <label className="label">Total</label>
          <div className="control">
            <div className="column is-8-mobile is-4-desktop ">
              <FoodValue
                foodValue={{
                  calories: 67.9,
                  carbs: 7.4,
                  fats: 1.9,
                  proteins: 5.3,
                }}
              />
            </div>
          </div>
        </div>
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
        {/* {dishes.map((dish) => (
          <Ingredient key={dish.id} dish={dish} />
        ))} */}
      </div>
    </Fragment>
  );
}

export default EatingForm;
