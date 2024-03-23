import Message from "@/shared/components/ui/Message";
import { FaRedo, FaSave } from "react-icons/fa";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import dishesService from "@/core/firebase/dishesService";
import { useEffect } from "react";
import Dish from "@/shared/models/Dish";

type Inputs = {
  name: string;
  "foodValue.proteins": number | null;
  "foodValue.fats": number | null;
  "foodValue.carbs": number | null;
  "foodValue.calories": number | null;
  defaultServingSize: number | null;
  cookedWeight: number | null;
};

function EditDish(props) {
  const params = useParams();
  const navigate = useNavigate();
  const { dish } = useOutletContext<{ dish: Dish }>();
  const { register, reset, getValues, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    reset({
      name: dish.name,
      defaultServingSize: dish.defaultServingSize,
      cookedWeight: dish.cookedWeight,
      "foodValue.calories": format(dish.foodValue.calories),
      "foodValue.proteins": format(dish.foodValue.proteins),
      "foodValue.fats": format(dish.foodValue.fats),
      "foodValue.carbs": format(dish.foodValue.carbs),
    });
  }, [dish]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await dishesService.updateDish(params.id!, data);
    navigate("/dishes");
  };
  const onCancel = () => navigate("/dishes");

  const format = (numb: number | string): number | null => {
    if (!dish.name) {
      return null;
    }

    const parsed = typeof numb === "string" ? parseFloat(numb) : numb;

    if (isNaN(parsed)) {
      return null;
    }

    if (dish.hasIngredients()) {
      return Math.round(parsed);
    }

    return parseFloat(parsed.toPrecision(2));
  };

  const handleNameChange = ({ target }) => {
    // Update outlet context to save when navigate to ingredients
    dish.name = target.value;
  };

  const recalculateFoodValue = () => {
    const cookedWeight = getValues("cookedWeight");
    if (!cookedWeight) {
      return;
    }
    dish.foodValue.calories = getValues("foodValue.calories");
    dish.foodValue.proteins = getValues("foodValue.proteins");
    dish.foodValue.fats = getValues("foodValue.fats");
    dish.foodValue.carbs = getValues("foodValue.carbs");
    const newFoodValue = dish.calculateFoodValue(cookedWeight);

    reset({
      "foodValue.calories": format(newFoodValue.calories),
      "foodValue.proteins": format(newFoodValue.proteins),
      "foodValue.fats": format(newFoodValue.fats),
      "foodValue.carbs": format(newFoodValue.carbs),
    });
  };

  return (
    <form id="dish-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="box">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input"
              type="text"
              data-testid="nameInput"
              {...register("name", { onChange: handleNameChange })}
            />
          </div>
        </div>

        {dish.hasIngredients() && (
          <Message title="Info">
            Food Value is calculated from ingredients
          </Message>
        )}

        <div className="field is-grouped">
          <div className="field mr-3">
            <label className="label">Proteins</label>
            <div className="control">
              <input
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                data-testid="proteinsInput"
                {...register("foodValue.proteins", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Fats</label>
            <div className="control">
              <input
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                data-testid="fatsInput"
                {...register("foodValue.fats", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Carbs</label>
            <div className="control">
              <input
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                data-testid="carbsInput"
                {...register("foodValue.carbs", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="field mr-3">
            <label className="label">KCal</label>
            <div className="control">
              <input
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                data-testid="caloriesInput"
                {...register("foodValue.calories", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Portion Size</label>
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="gramms"
                data-testid="portionSizeInput"
                {...register("defaultServingSize", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="field" style={{ maxWidth: "186px" }}>
            <label className="label">Cooked Dish Weight</label>
            <div className="field is-grouped">
              <div className="control is-expanded">
                <input
                  className="input"
                  type="number"
                  placeholder="gramms"
                  data-testid="cookedWeightInput"
                  {...register("cookedWeight", { valueAsNumber: true })}
                />
              </div>

              <div className="control">
                <button
                  className="button is-info"
                  type="button"
                  onClick={() => recalculateFoodValue()}
                >
                  <span className="icon is-small">
                    <FaRedo />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered is-justify-content-space-around">
          <p className="control">
            <button
              className="button is-light"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          </p>
          <p className="control">
            <button
              className="button is-primary"
              type="submit"
              data-testid="saveBtn"
            >
              <span className="icon">
                <FaSave />
              </span>
              <span>Save</span>
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}

export default EditDish;
