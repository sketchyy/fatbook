import React, { Fragment } from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import { Form, Outlet, useNavigate } from "react-router-dom";
import NavLinkTab from "../../shared/NavLinkTab";

function DishFormPage(props) {
  const navigate = useNavigate();

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
          <NavLinkTab to="ingredients">Ingredients (5)</NavLinkTab>
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
      <Outlet />
    </Fragment>
  );
}

export default DishFormPage;
