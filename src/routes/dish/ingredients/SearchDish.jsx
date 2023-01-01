import React, { Fragment } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import DishList from "../../../shared/DishList";
import PageTitle from "../../../shared/PageTitle";
import SearchBar from "../../../shared/SearchBar";

function SearchDish({ dish, onSelect }) {
  const { searchResult, q } = useLoaderData();
  const submit = useSubmit();

  return (
    <Fragment>
      <div className="block">
        <div className="box">
          <PageTitle title="Select ingredient" subtitle={"For " + dish.name} />

          <SearchBar
            defaultValue={q}
            onChange={(event) => {
              submit(event.currentTarget.form);
            }}
          />

          <DishList
            dishes={searchResult}
            onDishClick={(dish) => onSelect(dish)}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default SearchDish;
