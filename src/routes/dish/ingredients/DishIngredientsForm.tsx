import { FaPlus } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import dishesService from "../../../core/firebase/dishesService";
import EditDishPortionsForm from "../../../shared/components/dish-portions-form/EditDishPortionsForm";
import PageTitle from "../../../shared/components/PageTitle";

function DishIngredientsForm(props) {
  const navigate = useNavigate();
  const { dish } = useOutletContext<any>();

  const handleAdd = (e) => {
    navigate("add", { state: { backUrl: `/dishes/${dish._id}/ingredients` } });
  };

  const handleIngredientUpdate = async (ingredient) => {
    dish.updateIngredient(ingredient);

    await dishesService.replaceDish(dish);
  };

  const handleIngredientDelete = async (ingredient) => {
    if (!window.confirm("Are you sure you want to delete this ingredient?")) {
      return;
    }

    dish.deleteIngredient(ingredient);

    await dishesService.replaceDish(dish);
  };

  return (
    <div className="box">
      <PageTitle title={dish.name}>
        <button className="button is-primary" onClick={handleAdd}>
          <span className="icon">
            <FaPlus />
          </span>
          <span>Add</span>
        </button>
      </PageTitle>

      <EditDishPortionsForm
        dishPortions={dish.ingredients}
        onSave={handleIngredientUpdate}
        onDelete={handleIngredientDelete}
      />
    </div>
  );
}

export default DishIngredientsForm;
