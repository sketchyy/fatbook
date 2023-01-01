import React, { Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";
import DishList from "../../../shared/DishList";
import PageTitle from "../../../shared/PageTitle";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  console.log("q=", q);
  const searchResult = await dbService.searchDishes(q);
  return { searchResult, q };
}

function SearchDish({ dish, onSelect }) {
  const { searchResult, q } = useLoaderData();
  const submit = useSubmit();

  return (
    <Fragment>
      <div className="block">
        <div className="box">
          <PageTitle title="Select ingredient" subtitle={"For " + dish.name} />

          <div
            id="search-form"
            role="search"
            className="content content is-flex is-align-items-center"
          >
            <Form className="control has-icons-left search-field is-flex-grow-1">
              <input
                id="q"
                name="q"
                defaultValue={q}
                type="search"
                placeholder="Search dish"
                className="input"
                onChange={(event) => {
                  submit(event.currentTarget.form);
                }}
              />
              <span className="icon is-medium is-left">
                <FaSearch />
              </span>
              <span className="icon is-medium is-right"></span>
            </Form>
          </div>

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
