import { useMutation, UseMutationResult, useQueryClient } from "react-query";
import { DishPortion } from "@/types/dish-portion";
import eatingsService from "@/services/eatings-service";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/Auth";

type UseEatingMutations = {
  addEating: UseMutationResult<DishPortion, unknown, DishPortion>;
  updateEating: UseMutationResult<DishPortion, unknown, DishPortion>;
  deleteEating: UseMutationResult<void, unknown, DishPortion>;
};

export function useEatingMutations(meal: string): UseEatingMutations {
  const queryClient = useQueryClient();
  const { day } = useParams();
  const { user } = useAuth();

  const onSuccess = () => queryClient.invalidateQueries(["dailyEatings", day]);

  const addEating = useMutation({
    mutationFn: (portion: DishPortion) =>
      eatingsService.createEating(user?.id!, day!, meal!, portion),
    onSuccess,
  });

  const updateEating = useMutation({
    mutationFn: (portion: DishPortion) => eatingsService.updateEating(portion),
    onSuccess,
  });

  const deleteEating = useMutation({
    mutationFn: (portion: DishPortion) => eatingsService.deleteEating(portion),
    onSuccess,
  });

  return {
    addEating,
    updateEating,
    deleteEating,
  };
}
