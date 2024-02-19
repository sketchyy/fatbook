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
import { supabase } from "@/utils/supabase";

function DishPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [dish, setDish] = useState(Dish.empty());

  useEffect(() => {
    async function fetchDish() {
      const dish = await dishesService.getDish(Number(params.id)!);
      setDish(dish);
    }

    fetchDish();
  }, []);

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

export default DishPage;
