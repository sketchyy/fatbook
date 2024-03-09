import dishesServiceOld from "@/core/firebase/dishesServiceOld";
import EditDishPortionsForm from "@/shared/components/dish-portions-form/EditDishPortionsForm";
import PageTitle from "@/shared/components/PageTitle";
import Confirm, { Confirmation } from "@/shared/components/ui/Confirm";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import DishClass from "@/shared/models/DishClass";
import { Dish } from "@/types/dish";

function DishIngredientsList() {
  const navigate = useNavigate();
  const { dish } = useOutletContext<{ dish: Dish }>();
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });

  const handleAdd = (e) => {
    navigate("add", { state: { backUrl: `/dishes/${dish.id}/ingredients` } });
  };

  const handleIngredientUpdate = async (ingredient) => {
    dish.updateIngredient(ingredient);

    await dishesServiceOld.replaceDish(dish);
  };

  const handleIngredientDelete = async (ingredient) => {
    setConfirm({
      visible: true,
      accept: async () => {
        setConfirm({ visible: false });

        dish.deleteIngredient(ingredient);

        await dishesServiceOld.replaceDish(dish);
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

export default DishIngredientsList;
