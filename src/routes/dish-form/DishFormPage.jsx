import React, { Fragment } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import NavLinkTab from "../../shared/NavLinkTab";

function DishFormPage(props) {
  const navigate = useNavigate();

  const handleBackClick = () => navigate("/dishes");

  return (
    <Fragment>
      <div className="tabs is-boxed is-right mb-0">
        <button className="button is-white" onClick={handleBackClick}>
          <FaChevronLeft />
        </button>
        <ul>
          <NavLinkTab to="">Dish</NavLinkTab>
          <NavLinkTab to="ingredients">Ingredients (5)</NavLinkTab>
        </ul>
      </div>
      <Outlet />
    </Fragment>
  );
}

export default DishFormPage;
