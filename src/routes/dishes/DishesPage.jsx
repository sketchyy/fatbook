import React, { Fragment } from "react";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import dbService from "../../core/firebase/dbService";
import DishList from "../../shared/DishList";
import PageTitle from "../../shared/PageTitle";
import DishesSearch from "./components/DishesSearch";

export async function dishesLoader({ params }) {
  const dishes = await dbService.getDishes();
  console.log("dishesLoader", dishes);
  return { dishes };
}

function DishesPage(props) {
  const { dishes } = useLoaderData();
  const navigate = useNavigate();

  const handleDishClick = (dish) => {
    navigate(`/dishes/${dish._id}`);
  };

  return (
    <Fragment>
      <div className="box">
        <PageTitle title="My Dishes" subtitle="Most recently used">
          <Form method="post">
            <button className="button is-success">New</button>
          </Form>
        </PageTitle>

        <div className="block">
          <DishesSearch />
        </div>

        <DishList dishes={dishes} onDishClick={handleDishClick} />
      </div>
    </Fragment>
  );
}

export default DishesPage;
