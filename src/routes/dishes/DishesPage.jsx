import React, { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import dbService from "../../core/firebase/dbService";
import DishesList from "./DishesList";
import DishesSearch from "./DishesSearch";

export async function dishesLoader({ params }) {
  const dishes = await dbService.getDishes();
  console.log("dishesLoader", dishes);
  return { dishes };
}

export async function createDishAction() {
  let dish = {
    name: "",
    foodValue: {
      carbs: "",
      proteins: "",
      calories: "",
      fats: "",
    },
    defaultServingSize: "",
    ingredients: [],
  };

  return await dbService.createDish(dish);
}

function DishesPage(props) {
  const { dishes } = useLoaderData();

  return (
    <Fragment>
      <DishesSearch />
      <DishesList dishes={dishes} />
    </Fragment>
  );
}

export default DishesPage;
