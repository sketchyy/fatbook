import React, { Fragment } from "react";
import { FaSave } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

export async function dishLoader({ params }) {
  console.log("Dish Form Loader, params:", params);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: "test dish",
      });
    }, 300);
  });
}

function DishForm(props) {
  const contact = useLoaderData();

  return (
    <Fragment>
      <div className="tabs is-boxed is-centered mb-0">
        <ul>
          <li className="is-active">
            <a>Dish</a>
          </li>
          <li>
            <a>Ingredients</a>
          </li>
        </ul>
      </div>
      <div className="box">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input className="input" type="text" />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="field mr-3">
            <label className="label">Proteins</label>
            <div className="control">
              <input className="input" type="text" placeholder="per 100g." />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Fats</label>
            <div className="control">
              <input className="input" type="text" placeholder="per 100g." />
            </div>
          </div>
          <div className="field">
            <label className="label">Carbs</label>
            <div className="control">
              <input className="input" type="text" placeholder="per 100g." />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="field mr-3">
            <label className="label">KCal</label>
            <div className="control">
              <input className="input" type="text" placeholder="per 100g." />
            </div>
          </div>
          <div className="field">
            <label className="label">Portion Size</label>
            <div className="control">
              <input className="input" type="text" placeholder="gramms" />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered is-justify-content-space-around">
          <p className="control">
            <button className="button is-light">Cancel</button>
          </p>
          <p className="control">
            <button className="button is-primary">
              <FaSave className="mr-2" />
              Save
            </button>
          </p>
        </div>
      </div>
    </Fragment>
  );
}

export default DishForm;
