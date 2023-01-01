import React, { Fragment, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";
import SearchDish from "./SearchDish";
import SetPortionSize from "./SetPortionSize";

function SelectDishForm(props) {
  const { dish } = useOutletContext();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [dishPortion, setDishPortion] = useState({
    dish: null,
    servingSize: 0,
  });

  const handleDishSelect = (dish) => {
    setDishPortion({ dish });
    setPage(1);
  };
  const handlePortionSizeSubmit = async (servingSize) => {
    const newIngredient = {
      dish: dishPortion.dish,
      servingSize: Number(servingSize),
    };

    dish.ingredients = [newIngredient, ...dish.ingredients];
    await dbService.replaceDish(dish.id, dish);
    navigate(`/dishes/${dish.id}/ingredients`);
  };
  const handlePortionSizeCancel = () => {
    setPage(0);
  };

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return <SearchDish dish={dish} onSelect={handleDishSelect} />;
      case 1:
        return (
          <SetPortionSize
            selectedIngredient={dishPortion.dish}
            onCancel={handlePortionSizeCancel}
            onSubmit={handlePortionSizeSubmit}
          />
        );
      default:
        return <h2>Not found</h2>;
    }
  };

  return (
    <Fragment>
      <div>{conditionalComponent()}</div>
    </Fragment>
  );
}

export default SelectDishForm;
