import React from "react";
import { FaInfoCircle, FaSave } from "react-icons/fa";
import { Form, useNavigate, useOutletContext } from "react-router-dom";

function EditDish(props) {
  const navigate = useNavigate();
  const { dish } = useOutletContext();

  const onCancel = () => navigate("/dishes");

  return (
    <Form method="post" id="dish-form">
      <div className="box">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              name="name"
              className="input"
              type="text"
              defaultValue={dish.name}
            />
          </div>
        </div>

        {dish.hasIngredients() && (
          <article className="message is-info">
            <div className="message-header">
              <p className="is-flex is-align-items-center">
                <span className="icon is-medium">
                  <FaInfoCircle />
                </span>
                Info
              </p>
            </div>
            <div className="message-body">
              Food Value is calculated from ingredients
            </div>
          </article>
        )}

        <div className="field is-grouped">
          <div className="field mr-3">
            <label className="label">Proteins</label>
            <div className="control">
              <input
                name="foodValue.proteins"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={dish.foodValue.proteins}
              />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Fats</label>
            <div className="control">
              <input
                name="foodValue.fats"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={dish.foodValue.fats}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Carbs</label>
            <div className="control">
              <input
                name="foodValue.carbs"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={dish.foodValue.carbs}
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="field mr-3">
            <label className="label">KCal</label>
            <div className="control">
              <input
                name="foodValue.calories"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={dish.foodValue.calories}
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
                defaultValue={dish.defaultServingSize}
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
    </Form>
  );
}

export default EditDish;
