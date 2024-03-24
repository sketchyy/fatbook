import EditDishPortionsForm from "@/shared/components/dish-portions-form/EditDishPortionsForm";
import PageTitle from "@/shared/components/PageTitle";
import Confirm, { Confirmation } from "@/shared/components/ui/Confirm";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Dish } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import { useIngredientMutations } from "@/hooks/use-ingredients-mutations";

function DishIngredientsList() {
  const navigate = useNavigate();
  const { dish } = useOutletContext<{ dish: Dish }>();
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });
  const { update, remove } = useIngredientMutations(dish);

  const handleAdd = (e) => {
    navigate("add", { state: { backUrl: `/dishes/${dish.id}/ingredients` } });
  };

  const handleUpgradeIngredient = async (ingredient: DishPortion) => {
    update.mutate(ingredient);
  };

  const handleDeleteIngredient = async (ingredient: DishPortion) => {
    setConfirm({
      visible: true,
      accept: async () => {
        remove.mutate(ingredient);
        setConfirm({ visible: false });
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
        onSave={handleUpgradeIngredient}
        onDelete={handleDeleteIngredient}
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
