import Message from "@/shared/components/ui/Message";
import { FaRedo, FaSave } from "react-icons/fa";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import dishesService from "@/core/firebase/dishesService";
import { useEffect } from "react";
import Dish from "@/shared/models/Dish";

export type DishInputs = {
  name: string;
  proteins: number;
  fats: number;
  carbs: number;
  calories: number;
  portionSize: number | null;
  cookedWeight: number | null;
};

function EditDish(props) {
  const params = useParams();
  const navigate = useNavigate();
  const { dish } = useOutletContext<{ dish: Dish }>() ?? { dish: null };
  const { register, reset, getValues, handleSubmit } = useForm<DishInputs>();

  useEffect(() => {
    if (!dish) {
      return;
    }
    reset({
      name: dish.name,
      portionSize: dish.defaultServingSize,
      cookedWeight: dish.cookedWeight,
      calories: format(dish.calories),
      proteins: format(dish.proteins),
      fats: format(dish.fats),
      carbs: format(dish.carbs),
    });
  }, [dish]);

  const onSubmit: SubmitHandler<DishInputs> = async (data) => {
    if (dish) {
      await dishesService.updateDish(+params.id!, data);
    } else {
      await dishesService.createDish(data);
    }
    navigate("/dishes");
  };
  const onCancel = () => navigate("/dishes");

  const handleNameChange = ({ target }) => {
    // Update outlet context to save when navigate to ingredients
    dish.name = target.value;
  };

  const recalculateFoodValue = () => {
    const cookedWeight = getValues("cookedWeight");
    if (!cookedWeight) {
      return;
    }
    // TODO: cookedWeight only for dish with ingredients
    // dish.foodValue.calories = getValues("foodValue.calories");
    // dish.foodValue.proteins = getValues("foodValue.proteins");
    // dish.foodValue.fats = getValues("foodValue.fats");
    // dish.foodValue.carbs = getValues("foodValue.carbs");
    const newFoodValue = dish.calculateFoodValue(cookedWeight);

    reset({
      calories: format(newFoodValue.calories),
      proteins: format(newFoodValue.proteins),
      fats: format(newFoodValue.fats),
      carbs: format(newFoodValue.carbs),
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
              {...register("name", { onChange: handleNameChange })}
            />
          </div>
        </div>

        {dish?.hasIngredients() && (
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
                disabled={dish?.hasIngredients()}
                {...register("proteins", {
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
                disabled={dish?.hasIngredients()}
                {...register("fats", { valueAsNumber: true })}
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
                disabled={dish?.hasIngredients()}
                {...register("carbs", { valueAsNumber: true })}
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
                disabled={dish?.hasIngredients()}
                {...register("calories", { valueAsNumber: true })}
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
                {...register("portionSize", { valueAsNumber: true })}
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
            <button className="button is-primary" type="submit">
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

const format = (numb: number): number => {
  return parseFloat(numb.toPrecision(2));
};

export default EditDish;
