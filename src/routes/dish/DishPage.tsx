import NavLinkTab from "@/shared/components/ui/NavLinkTab";
import { Fragment } from "react";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import dishesService from "@/services/dishes-service";

function DishPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { data: dish, isLoading } = useQuery({
    queryKey: ["dish", +params.id!],
    queryFn: () => dishesService.getDish(params.id!),
  });
  const deleteDish = useMutation(dishesService.deleteDish);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const handleBackClick = () => {
    if (location.state?.backUrl) {
      navigate(location.state.backUrl);
    } else {
      navigate("/dishes");
    }
  };

  const handleDelete = () => {
    if (!window.confirm("Please confirm you want to delete this record.")) {
      return;
    }
    deleteDish.mutate(dish!.id, {
      onSuccess: () => {
        navigate("/dishes");
      },
    });
  };

  return (
    <>
      <div className="tabs is-boxed is-centered mb-0">
        <button className="button is-text" onClick={handleBackClick}>
          <FaChevronLeft />
        </button>
        <ul>
          <NavLinkTab to="edit">Dish</NavLinkTab>
          <NavLinkTab to="ingredients">
            Ingredients ({dish?.ingredients.length ?? 0})
          </NavLinkTab>
        </ul>
        {dish && (
          <button
            type="submit"
            className="button is-text"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <Outlet context={{ dish }} />
    </>
  );
}

export default DishPage;
