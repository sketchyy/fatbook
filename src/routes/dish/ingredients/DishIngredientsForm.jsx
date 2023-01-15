import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";
import DishPortionList from "../../../shared/DishPortionList";
import PageTitle from "../../../shared/PageTitle";

function DishIngredientsForm(props) {
  const navigate = useNavigate();
  const { dish } = useOutletContext();

  const handleAdd = (e) => {
    navigate("add", { state: { backUrl: `/dishes/${dish._id}/ingredients` } });
  };
  const handleIngredientDelete = async (ingredient) => {
    if (!window.confirm("Are you sure you want to delete this ingredient?")) {
      return;
    }

    dish.deleteIngredient(ingredient);

    await dbService.replaceDish(dish);
  };

  return (
    <div className="box">
      <PageTitle title={dish.name}>
        <button className="button is-primary" onClick={handleAdd}>
          <span className="icon">
            <FaPlus />
          </span>
          <span>Add</span>
        </button>
      </PageTitle>

      <DishPortionList
        dishPortions={dish.ingredients}
        onPortionDelete={handleIngredientDelete}
        emptyMessage="No ingredients."
      />
    </div>
  );
}

export default DishIngredientsForm;
