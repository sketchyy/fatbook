import React, { Fragment } from "react";
import { Form, useLoaderData, useNavigate, useSubmit } from "react-router-dom";
import DishList from "../../shared/DishList";
import PageTitle from "../../shared/PageTitle";
import SearchBar from "../../shared/SearchBar";

function DishesPage(props) {
  const { searchResult, q } = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();

  const handleDishClick = (dish) => {
    navigate(`/dishes/${dish.id}`);
  };

  return (
    <Fragment>
      <div className="box">
        <PageTitle title="My Dishes" subtitle="Recently used">
          <Form method="post">
            <button className="button is-success">New</button>
          </Form>
        </PageTitle>

        <SearchBar
          defaultValue={q}
          onChange={(event) => {
            submit(event.currentTarget.form);
          }}
        />

        <DishList dishes={searchResult} onDishClick={handleDishClick} />
      </div>
    </Fragment>
  );
}

export default DishesPage;
