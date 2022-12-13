import React, { Fragment } from "react";
import DishesList from "./DishesList";
import DishesSearch from "./DishesSearch";

function DishesPage(props) {
  return (
    <Fragment>
      <DishesSearch />
      <DishesList />
    </Fragment>
  );
}

export default DishesPage;
