import dishesService from "@/core/firebase/dishesService";
import EditDishPortionsForm from "@/shared/components/dish-portions-form/EditDishPortionsForm";
import PageTitle from "@/shared/components/PageTitle";
import Confirm, { Confirmation } from "@/shared/components/ui/Confirm";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";

// TODO: [bug] food value not updated after portion size update
function DishIngredientsForm(props) {
  const navigate = useNavigate();
  const { dish } = useOutletContext<any>();
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });

  const handleAdd = (e) => {
    navigate("add", { state: { backUrl: `/dishes/${dish._id}/ingredients` } });
  };

  const handleIngredientUpdate = async (ingredient) => {
    dish.updateIngredient(ingredient);

    await dishesService.replaceDish(dish);
  };

  const handleIngredientDelete = async (ingredient) => {
    setConfirm({
      visible: true,
      accept: async () => {
        setConfirm({ visible: false });

        dish.deleteIngredient(ingredient);

        await dishesService.replaceDish(dish);
      },
    });
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

      <Confirm
        message="Are you sure you want to delete this ingredient?"
        visible={confirm.visible}
        onConfirm={confirm.accept}
        onClose={() => setConfirm({ visible: false })}
      />
    </div>
  );
}

export default DishIngredientsForm;
