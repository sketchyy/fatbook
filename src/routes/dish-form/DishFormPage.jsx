import React, { Fragment } from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import { Form, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import dbService from "../../core/firebase/dbService";
import NavLinkTab from "../../shared/NavLinkTab";

export async function dishLoader({ params }) {
  const dish = await dbService.getDish(params.id);
  console.log("Dish Form Loader, params:", params, dish);

  dish.defaultServingSize = dish.defaultServingSize ?? "";

  return { dish };
}

function DishFormPage(props) {
  const navigate = useNavigate();
  const { dish } = useLoaderData();

  const handleBackClick = () => navigate("/dishes");
  const handleDelete = (event) => {
    if (!window.confirm("Please confirm you want to delete this record.")) {
      event.preventDefault();
    }
  };

  return (
    <Fragment>
      <div className="tabs is-boxed is-centered mb-0">
        <button className="button is-text" onClick={handleBackClick}>
          <FaChevronLeft />
        </button>
        <ul>
          <NavLinkTab to="">Dish</NavLinkTab>
          <NavLinkTab to="ingredients">
            Ingredients ({dish.ingredients.length})
          </NavLinkTab>
        </ul>
        <Form method="post" action="delete" onSubmit={handleDelete}>
          <button
            type="submit"
            className="button is-text"
            onClick={handleBackClick}
          >
            <FaTrash />
          </button>
        </Form>
      </div>
      <Outlet context={{ dish }} />
    </Fragment>
  );
}

export default DishFormPage;
