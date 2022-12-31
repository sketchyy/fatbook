import React, { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import Ingredient from "../../../shared/Ingredient";

function DishIngredientsForm(props) {
  const navigate = useNavigate();
  const { dish } = useOutletContext();
  const [ingredients, setIngredients] = useState(dish.ingredients);

  const handleAdd = (e) => {
    navigate("add", { state: { backUrl: `/dishes/${dish._id}/ingredients` } });
  };

  return (
    <Fragment>
      <div className="box">
        <div className="is-flex is-justify-content-end block">
          <button className="button is-primary" onClick={handleAdd}>
            <span className="icon">
              <FaPlus />
            </span>
            <span>Add</span>
          </button>
        </div>

        {ingredients.length === 0 && (
          <p className="has-text-centered">No ingredients.</p>
        )}
        {ingredients.map((ingredient, i) => (
          <Ingredient key={i} ingredient={ingredient} />
        ))}
      </div>
    </Fragment>
  );
}

export default DishIngredientsForm;
