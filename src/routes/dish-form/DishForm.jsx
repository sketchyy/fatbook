import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";

function DishForm(props) {
  const navigate = useNavigate();
  const { dish: dishResponse } = useOutletContext();
  const [dish, setDish] = useState(dishResponse);

  const onCancel = () => navigate("/dishes");
  const onSave = () => navigate("/dishes");
  const handleDishChange = ({ target }) => {
    setDish({
      ...dish,
      [target.name]: target.value,
    });
  };
  const handleFoodValueChange = ({ target }) => {
    setDish({
      ...dish,
      foodValue: {
        ...dish.foodValue,
        [target.name]: target.value,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", dish);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              name="name"
              className="input"
              type="text"
              value={dish.name}
              onChange={handleDishChange}
            />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="field mr-3">
            <label className="label">Proteins</label>
            <div className="control">
              <input
                name="proteins"
                className="input"
                type="number"
                placeholder="per 100g."
                value={dish.foodValue.proteins}
                onChange={handleFoodValueChange}
              />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Fats</label>
            <div className="control">
              <input
                name="fats"
                className="input"
                type="number"
                placeholder="per 100g."
                value={dish.foodValue.fats}
                onChange={handleFoodValueChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Carbs</label>
            <div className="control">
              <input
                name="carbs"
                className="input"
                type="number"
                placeholder="per 100g."
                value={dish.foodValue.carbs}
                onChange={handleFoodValueChange}
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="field mr-3">
            <label className="label">KCal</label>
            <div className="control">
              <input
                name="calories"
                className="input"
                type="number"
                placeholder="per 100g."
                value={dish.foodValue.calories}
                onChange={handleFoodValueChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Portion Size</label>
            <div className="control">
              <input
                name="defaultServingSize"
                className="input"
                type="number"
                placeholder="gramms"
                value={dish.defaultServingSize}
                onChange={handleDishChange}
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered is-justify-content-space-around">
          <p className="control">
            <button className="button is-light" onClick={onCancel}>
              Cancel
            </button>
          </p>
          <p className="control">
            <button className="button is-primary" type="submit">
              <span className="icon">
                <FaSave />
              </span>
              <span>Save</span>
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}

export default DishForm;
