import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { DishPortion } from "@/types/dish-portion";
import {
  createEating,
  deleteEating,
  updateEating,
} from "@/services/eatings-service";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/Auth";
import { useState } from "react";
import { calculateFoodValue } from "@/utils/food-value-utils";
import { toast } from "react-toastify";

type OnMutate = (portion: DishPortion) => void;

type UseEatingMutations = {
  add: UseMutationResult<DishPortion, unknown, DishPortion>;
  update: UseMutationResult<DishPortion, unknown, DishPortion>;
  remove: UseMutationResult<void, unknown, DishPortion>;
  selectedPortions: DishPortion[];
};

export function useEatingMutations(meal: string): UseEatingMutations {
  const queryClient = useQueryClient();
  const { day } = useParams();
  const { userId } = useAuth();
  const [selectedPortions, setSelectedPortions] = useState<DishPortion[]>([]);

  // Optimistic update
  const createOnMutate = (optimisticMutation: OnMutate) => (portion) => {
    // Perform optimistic update
    optimisticMutation(portion);
    // Snapshot the previous value (will be used in case of error)
    return { previousValue: selectedPortions.slice() };
  };
  // Write actual value from the response
  const onSuccess = (response: DishPortion | void) => {
    queryClient.invalidateQueries({ queryKey: ["dailyEatings", day] });
    if (response) {
      setSelectedPortions((portions) => {
        const optimisticIndex = portions.findIndex(
          // Only one dish can be added at a time, hence dish id is unique
          (p) => p.dish.id === response.dish.id,
        );
        portions[optimisticIndex] = response;
        return portions;
      });
    }
  };
  // Revert to previous value if error occured
  const onError = (_err, _newItem, context) => {
    toast.error("Error while saving");
    setSelectedPortions(context!.previousValue);
  };

  const add = useMutation({
    mutationFn: (portion: DishPortion) =>
      createEating(userId, day!, meal!, portion),
    onMutate: createOnMutate((newPortion) => {
      newPortion.selected = true;
      const foodValue = calculateFoodValue(newPortion);
      setSelectedPortions((portions) => [
        ...portions,
        { ...newPortion, ...foodValue },
      ]);
    }),
    onSuccess,
    onError,
  });

  const update = useMutation({
    mutationFn: (portion: DishPortion) => updateEating(portion),
    onMutate: createOnMutate((updatedPortion) => {
      setSelectedPortions((portions) => {
        const foodValue = calculateFoodValue(updatedPortion);
        return portions.map((p) =>
          p.dish.id === updatedPortion.dish.id
            ? { ...updatedPortion, ...foodValue }
            : p,
        );
      });
    }),
    onSuccess,
    onError,
  });

  const remove = useMutation({
    mutationFn: (portion: DishPortion) => deleteEating(portion),
    onMutate: createOnMutate((deletedPortion) => {
      setSelectedPortions((portions) => {
        return portions.filter((p) => p.dish.id !== deletedPortion.dish.id);
      });
    }),
    onSuccess,
    onError,
  });

  return {
    add,
    update,
    remove,
    selectedPortions,
  };
}
