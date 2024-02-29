import dishesService from "@/core/firebase/dishesService";
import NavLinkTab from "@/shared/components/ui/NavLinkTab";
import Dish from "@/shared/models/Dish";
import { Fragment, useEffect, useState } from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import {
  Form,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useQuery } from "react-query";
import { Simulate } from "react-dom/test-utils";
import load = Simulate.load;

function DishPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const {
    data: dish,
    isLoading,
    error,
  } = useQuery(["dish", +params.id!], () => dishesService.getDish(+params.id!));

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error: {error as any}</h2>;
  }

  const handleBackClick = () => {
    if (location.state?.backUrl) {
      navigate(location.state.backUrl);
    } else {
      navigate("/dishes");
    }
  };
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
          <NavLinkTab to="edit">Dish</NavLinkTab>
          <NavLinkTab to="ingredients">
            Ingredients ({dish!.ingredients.length})
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

export default DishPage;
