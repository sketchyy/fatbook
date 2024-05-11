import EditDishPortionsForm from "@/components/dish-portions-form/EditDishPortionsForm";
import PageTitle from "@/components/PageTitle";
import Confirm, { Confirmation } from "@/components/ui/Confirm";
import { useState } from "react";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Dish } from "@/types/dish";
import { DishPortion } from "@/types/dish-portion";
import { useIngredientMutations } from "@/hooks/use-ingredients-mutations";
import { DishIngredientsDetails } from "@/components/dish/DishIngredientsDetails";

function DishIngredients() {
  const navigate = useNavigate();
  const { dish } = useOutletContext<{ dish: Dish }>();
  const [showDetails, setShowDetails] = useState(false);
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });
  const { update, remove, selectedPortions } = useIngredientMutations(
    dish,
    dish.ingredients,
  );
  const ingredients = selectedPortions.map((p) => ({ ...p, selected: false }));

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
      <PageTitle title={dish.name} className="mb-0 pb-4">
        <button className="button is-primary" onClick={handleAdd}>
          <span className="icon">
            <FaPlus />
          </span>
          <span>Add</span>
        </button>
      </PageTitle>

      {dish.ingredients.length > 0 && !showDetails && (
        <div className="is-flex is-justify-content-end mt-4 mb-2">
          <button
            onClick={() => setShowDetails((s) => !s)}
            className="button is-small is-rounded"
          >
            <span className="mr-2">Cooking</span>
            <FaChevronDown />
          </button>
        </div>
      )}

      <DishIngredientsDetails
        visible={showDetails}
        setVisible={setShowDetails}
        dish={dish}
      />

      <EditDishPortionsForm
        dishPortions={ingredients}
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

export default DishIngredients;
