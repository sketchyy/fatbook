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
