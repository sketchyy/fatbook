import React, { useEffect } from "react";
import Message from "@/components/ui/Message";
import FoodValue from "@/components/FoodValue";
import { FoodWeight } from "@/components/FoodWeight";
import { Dish } from "@/types/dish";
import {
  calculateDishValuePer100g,
  sumFoodValues,
} from "@/utils/food-value-utils";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDishMutations } from "@/hooks/use-dish-mutations";
import { clsx } from "clsx";

type CookedWeightInput = { cookedWeight: number | null };

type Props = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  dish: Dish;
  disabled?: boolean;
};

export const DishIngredientsDetails = ({
  visible,
  setVisible,
  dish,
  disabled,
}: Props) => {
  const { register, reset, getValues, handleSubmit } =
    useForm<CookedWeightInput>();
  const { update } = useDishMutations(dish.id);

  // When ingredients changed, we need to reset cookedWeight value in DB, and reset it in UI.
  useEffect(() => {
    reset({ cookedWeight: dish.cookedWeight });
  }, [dish]);

  if (!visible) {
    return null;
  }

  const recalculateFoodValue = () => {
    const cookedWeight = getValues("cookedWeight");
    if (!cookedWeight) {
      return;
    }
    const newFoodValue = calculateDishValuePer100g(
      dish.ingredients,
      cookedWeight,
    );
    const dishUpdate = { ...newFoodValue, cookedWeight };

    update.mutate(dishUpdate, {
      onSuccess: () => toast.success("Saved!"),
      onError: () =>
        toast.error("Error while saving!", { position: "top-center" }),
    });
  };

  const raw100gFoodValue = calculateDishValuePer100g(dish.ingredients);
  const rawTotalFoodValue = sumFoodValues(dish.ingredients);
  const rawTotalWeight = dish.ingredients.reduce(
    (sum, next) => (sum += next.portion ?? 0),
    0,
  );

  return (
    <Message
      title="Cooking"
      onClose={() => setVisible(!visible)}
      className="mt-2"
      bodyClassName="py-4 px-2"
    >
      <form onSubmit={handleSubmit(recalculateFoodValue)} className="mb-4">
        <div className="field is-grouped is-align-items-end">
          <p className="control is-expanded">
            <label className="label">Cooked Weight (g.)</label>
            <input
              className="input"
              type="number"
              placeholder="gramms"
              disabled={disabled}
              {...register("cookedWeight", { valueAsNumber: true })}
            />
          </p>

          {!disabled && (
            <p className="control">
              <button
                className={clsx("button is-info", {
                  "is-loading": update.isPending,
                })}
              >
                <span className={clsx("icon is-small")}>
                  <FaCheck />
                </span>
              </button>
            </p>
          )}
        </div>
      </form>

      <p className="mb-1">🍗 Cooked:</p>
      <div className="is-flex is-justify-content-space-between has-text-dark">
        <FoodValue
          source={dish}
          className="level-left is-size-7 has-text-dark"
        />
        <FoodWeight value={null} />
      </div>

      <p className="mt-4 mb-2">🥩 Raw:</p>
      <div className="is-flex is-justify-content-space-between has-text-dark">
        <FoodValue source={raw100gFoodValue} className="level-left is-size-7" />
        <FoodWeight value={null} />
      </div>

      <p className="mt-4 mb-2">🥩 Raw Total:</p>
      <div className="is-flex is-justify-content-space-between has-text-dark">
        <FoodValue
          source={rawTotalFoodValue}
          className="level-left is-size-7"
        />
        <FoodWeight value={rawTotalWeight} />
      </div>
    </Message>
  );
};
