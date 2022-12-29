import React, { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import Ingredient from "../../../shared/Ingredient";

function DishIngredientsForm(props) {
  const { dish } = useOutletContext();
  const [newDish, setNewDish] = useState({
    name: "",
    servingSize: "",
  });
  const [ingredients, setIngredients] = useState(dish.ingredients);

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
      ...ingredients,
      { name: newDish.name, defaultServingSize: newDish.servingSize },
    ];
    setIngredients(newDishes);
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
