import React, { Fragment } from "react";
import DishesList from "./DishesList";
import DishesSearch from "./DishesSearch";

function DishesPage(props) {
  return (
    <Fragment>
      <div className="">
        <DishesSearch />

        <DishesList className="column is-8 is-offset-2" />
      </div>
    </Fragment>
  );
}

export default DishesPage;
