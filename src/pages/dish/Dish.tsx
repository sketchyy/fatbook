import NavLinkTab from "@/components/ui/NavLinkTab";
import { FaChevronLeft, FaTrash } from "react-icons/fa";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dishesService } from "@/services/dishes-service";
import { isNil } from "@/utils/is-nil";
import AppLayout from "@/components/AppLayout";
import { SHARED_COLLECTION_ID } from "@/constants";

// TODO: rename DishPage
function Dish() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const { data: dish, isLoading } = useQuery({
    queryKey: ["dish", +params.id!],
    queryFn: () => dishesService.fetchDish(+params.id!),
  });
  const deleteMutation = useMutation({ mutationFn: dishesService.deleteDish });
  const isCreate = isNil(params.id);
  const isDishShared = dish?.collectionId === SHARED_COLLECTION_ID;
  const canDelete = !isCreate && !isDishShared;

  if (!isLoading && !dish) {
    navigate("/not-found");
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
    deleteMutation.mutate(dish!.id, {
      onSuccess: () => {
        navigate("/dishes");
      },
    });
  };

  return (
    <AppLayout>
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
        {canDelete && (
          <button
            type="submit"
            className="button is-text"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <Outlet context={{ dish, isDishShared, isLoading }} />
    </AppLayout>
  );
}

export default Dish;
