import React, { Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import dbService from "../../core/firebase/dbService";
import DishesList from "./DishesList";
import DishesSearch from "./DishesSearch";

export async function dishesLoader({ params }) {
  const dishes = await dbService.getDishes();
  return { dishes };
}

function DishesPage(props) {
  const { dishes } = useLoaderData();

  console.log("asd", dishes);
  return (
    <Fragment>
      <DishesSearch />
      <DishesList dishes={dishes} />
    </Fragment>
  );
}

export default DishesPage;
