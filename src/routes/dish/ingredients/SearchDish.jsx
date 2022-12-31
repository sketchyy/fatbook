import React, { Fragment } from "react";
import { FaSearch } from "react-icons/fa";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import dbService from "../../../core/firebase/dbService";
import DishListItem from "../../../shared/DishListItem";

export async function dishesSearchLoader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  console.log("q=", q);
  const searchResult = await dbService.searchDishes(q);
  return { searchResult, q };
}

function SearchDish({ onSelect }) {
  const { searchResult, q } = useLoaderData();
  const submit = useSubmit();

  return (
    <Fragment>
      <div className="block">
        <div className="card">
          <div className="card-content">
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

            <hr className="has-background-dark mb-0" />

            {searchResult.length === 0 && (
              <p className="has-text-centered mt-3">Nothing was found.</p>
            )}

            {searchResult.map((dish) => (
              <DishListItem
                key={dish._id}
                dish={dish}
                onClick={() => onSelect(dish)}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default SearchDish;
