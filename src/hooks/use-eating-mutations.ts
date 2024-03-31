import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { DishPortion } from "@/types/dish-portion";
import {
  createEating,
  deleteEating,
  updateEating,
} from "@/services/eatings-service";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/Auth";

type UseEatingMutations = {
  add: UseMutationResult<DishPortion, unknown, DishPortion>;
  update: UseMutationResult<DishPortion, unknown, DishPortion>;
  remove: UseMutationResult<void, unknown, DishPortion>;
};

export function useEatingMutations(meal: string): UseEatingMutations {
  const queryClient = useQueryClient();
  const { day } = useParams();
  const { userId } = useAuth();

  const onSuccess = () => queryClient.invalidateQueries(["dailyEatings", day]);

  const add = useMutation({
    mutationFn: (portion: DishPortion) =>
      createEating(userId, day!, meal!, portion),
    onSuccess,
  });

  const update = useMutation({
    mutationFn: (portion: DishPortion) => updateEating(portion),
    onSuccess,
  });

  const remove = useMutation({
    mutationFn: (portion: DishPortion) => deleteEating(portion),
    onSuccess,
  });

  return {
    add,
    update,
    remove,
  };
}
