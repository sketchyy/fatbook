import React, { Fragment } from "react";
import { Form, useLoaderData } from "react-router-dom";
import dbService from "../../core/firebase/dbService";
import DishesList from "./components/DishesList";
import DishesSearch from "./components/DishesSearch";

export async function dishesLoader({ params }) {
  const dishes = await dbService.getDishes();
  console.log("dishesLoader", dishes);
  return { dishes };
}

function DishesPage(props) {
  const { dishes } = useLoaderData();

  return (
    <Fragment>
      <div className="box">
        <div className="block is-flex is-align-items-center">
          <div className=" is-flex-grow-1">
            <p className="title is-5">My Dishes</p>
            <p className="subtitle is-7">Most recently used</p>
          </div>
          <Form method="post">
            <button className="button is-success">New</button>
          </Form>
        </div>
        <DishesSearch />
        <hr className="has-background-black mb-0" />
        <DishesList dishes={dishes} />
      </div>
    </Fragment>
  );
}

export default DishesPage;
