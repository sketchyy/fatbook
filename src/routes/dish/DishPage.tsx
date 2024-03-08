import dishesService from "@/core/firebase/dishesService";
import NavLinkTab from "@/shared/components/ui/NavLinkTab";
import { Fragment } from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

function DishPage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const {
    data: dish,
    isLoading,
    error,
  } = useQuery(["dish", +params.id!], () => dishesService.getDish(+params.id!));
  const deleteDish = useMutation(dishesService.deleteDish, {
    onSuccess: () => {
      navigate("/dishes");
    },
  });

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
      return;
    }
    deleteDish.mutate(dish!.id);
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
        <button type="submit" className="button is-text" onClick={handleDelete}>
          <FaTrash />
        </button>
      </div>
      <Outlet context={{ dish }} />
    </Fragment>
  );
}

export default DishPage;
