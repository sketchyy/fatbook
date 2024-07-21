import Message from "@/components/ui/Message";
import { FaInfoCircle, FaSave } from "react-icons/fa";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Dish } from "@/types/dish";
import { updateDish } from "@/services/dishes-service";
import { isNil } from "@/utils/is-nil";
import { formatDate } from "@/utils/date-utils";
import { getDishIcon } from "@/utils/icon-utils";
import { clsx } from "clsx";
import EmojiPicker from "@/components/ui/EmojiPicker";

export type DishInputs = {
  name: string | null;
  icon: string | null;
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
  const { dish, isLoading } = useOutletContext<{
    dish?: Dish;
    isLoading: boolean;
  }>();
  const { register, reset, handleSubmit, setValue, formState } =
    useForm<DishInputs>();
  const [icon, setIcon] = useState<string>("");
  useEffect(() => {
    // When user made changes, we don't want to reset the form
    if (!dish || formState.isDirty) {
      return;
    }
    const icon = getDishIcon(dish);
    reset({
      name: dish.name,
      icon: null,
      defaultPortion: dish.defaultPortion,
      cookedWeight: dish.cookedWeight,
      calories: format(dish.calories),
      proteins: format(dish.proteins),
      fats: format(dish.fats),
      carbs: format(dish.carbs),
    });
    setIcon(icon);
  }, [dish]);

  const hasIngredients = dish?.ingredients?.length! > 0;

  const onSubmit: SubmitHandler<DishInputs> = async (data) => {
    await updateDish(+params.id!, data);

    navigate("/dishes");
  };

  const onCancel = () => navigate("/dishes");

  const handleNameChange = ({ target }) => {
    // Update outlet context to save when navigate to ingredients
    dish!.name = target.value;
  };

  const handleIconChange = (icon: string) => {
    setValue("icon", icon);
    setIcon(icon);
  };

  return (
    <form id="dish-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="box">
        <div className="is-flex is-align-items-start">
          <div className="field mr-3">
            <label className="label">Icon</label>
            <div className="control">
              <EmojiPicker
                value={icon}
                onChange={handleIconChange}
                isLoading={isLoading}
              />
            </div>
          </div>
          <div className="field is-flex-grow-1">
            <label className="label">Name</label>
            <div className="control is-expanded">
              <input
                className={clsx("input", { "is-skeleton": isLoading })}
                type="text"
                {...register("name", { onChange: handleNameChange })}
              />
            </div>
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
                className={clsx("input", { "is-skeleton": isLoading })}
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
                className={clsx("input", { "is-skeleton": isLoading })}
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
                className={clsx("input", { "is-skeleton": isLoading })}
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
                className={clsx("input", { "is-skeleton": isLoading })}
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={hasIngredients}
                {...register("calories", { valueAsNumber: true })}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Portion Size</label>
            <div className="control">
              <input
                className={clsx("input", { "is-skeleton": isLoading })}
                type="number"
                placeholder="gramms"
                {...register("defaultPortion", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        <div className="level">
          <div className="level-left level is-mobile mb-0 mr-auto">
            <div className="is-size-7 is-align-self-flex-end">
              <strong>Created</strong>
              <p className={clsx({ "is-skeleton": isLoading })}>
                {formatDate(dish?.createdAt, "DD MMM YYYY")}
              </p>
            </div>
            <div className="is-size-7 is-align-self-flex-end is-flex-grow-1">
              <strong>Updated</strong>
              <p className={clsx({ "is-skeleton": isLoading })}>
                {formatDate(dish?.updatedAt, "DD MMM YYYY")}
              </p>
            </div>
          </div>
          <div className="level-left level is-mobile ml-auto">
            <p className="control">
              <button className="button" type="button" onClick={onCancel}>
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
      </div>
    </form>
  );
}

const format = (numb: number | null): number | null => {
  return isNil(numb) ? null : Math.round(numb);
};

export default DishEdit;
