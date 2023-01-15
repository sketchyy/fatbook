import React from "react";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import DishPortionList from "../../shared/DishPortionList";
import FoodValue from "../../shared/FoodValue";
import PageTitle from "../../shared/PageTitle";
import { meals } from "./MealCard";

function MealPage(props) {
  const navigate = useNavigate();
  const { meal } = useParams();
  const { day, logDay } = useOutletContext();
  const eatings = logDay.meals[meal].eatings;
  const foodValue = logDay.meals[meal].totalFoodValue;

  const handleAddEatingDelete = async (ingredient) => {
    if (!window.confirm("Are you sure you want to delete this eating?")) {
      return;
    }

    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.deleteEating(meal, ingredient);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  return (
    <div className="box">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-narrow">
          <button
            className="button is-text"
            onClick={() => navigate(`/eatings/${day}`)}
          >
            <span className="icon">
              <FaChevronLeft />
            </span>
          </button>
        </div>
        <div className="column">
          <h1 className="title is-4">{meals[meal].title}</h1>
          <h2 className="subtitle is-6">{day}</h2>
        </div>
        <div className="column is-narrow">
          <Link to="add" className="button is-primary">
            <span className="icon">
              <FaPlus />
            </span>
            <span>Add</span>
          </Link>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <div className="">
            <FoodValue foodValue={foodValue} />
          </div>
        </div>
      </div>
      <div className="block">
        <PageTitle title="Eatings"></PageTitle>
        <DishPortionList
          dishPortions={eatings}
          onPortionDelete={handleAddEatingDelete}
          emptyMessage="No eatings."
        />
      </div>
    </div>
  );
}

export default MealPage;
