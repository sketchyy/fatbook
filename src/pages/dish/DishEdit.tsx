import Message from "@/components/ui/Message";
import { FaInfoCircle, FaSave } from "react-icons/fa";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Dish } from "@/types/dish";
import { updateDish } from "@/services/dishes-service";
import { isNil } from "@/utils/is-nil";
import { formatDate } from "@/utils/date-utils";

export type DishInputs = {
  name: string | null;
  proteins: number | null;
  fats: number | null;
  carbs: number | null;
  calories: number | null;
  defaultPortion: number | null;
  cookedWeight: number | null;
};

function DishEdit() {
  const params = useParams();
  const navigate = useNavigate();
  const { dish } = useOutletContext<{ dish: Dish }>();
  const { register, reset, handleSubmit } = useForm<DishInputs>();

  useEffect(() => {
    reset({
      name: dish.name,
      defaultPortion: dish.defaultPortion,
      cookedWeight: dish.cookedWeight,
      calories: format(dish.calories),
      proteins: format(dish.proteins),
      fats: format(dish.fats),
      carbs: format(dish.carbs),
    });
  }, [dish]);

  const hasIngredients = dish?.ingredients?.length! > 0;

  const onSubmit: SubmitHandler<DishInputs> = async (data) => {
    await updateDish(+params.id!, data);

    navigate("/dishes");
  };

  const onCancel = () => navigate("/dishes");

  const handleNameChange = ({ target }) => {
    // Update outlet context to save when navigate to ingredients
    dish.name = target.value;
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

        {hasIngredients && (
          <Message>
            <p className="is-flex is-align-items-center">
              <span className="icon is-medium">
                <FaInfoCircle />
              </span>
              Food Value is calculated from ingredients
            </p>
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
                disabled={hasIngredients}
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
                disabled={hasIngredients}
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
                disabled={hasIngredients}
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
                disabled={hasIngredients}
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
                {...register("defaultPortion", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="is-size-7 is-align-self-flex-end is-flex-grow-1">
            <strong>Updated</strong>
            <p>{formatDate(dish.updatedAt, "hh:mm, DD MMM YYYY")}</p>
          </div>
          <p className="control mr-5">
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

const format = (numb: number | null): number | null => {
  return isNil(numb) ? null : Math.round(numb);
};

export default DishEdit;
