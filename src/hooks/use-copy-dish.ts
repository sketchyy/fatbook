import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { dishesService } from "@/services/dishes-service";
import { useAuth } from "@/context/Auth";
import { useNavigate } from "react-router-dom";
import { Dish } from "@/types/dish";

type UseCopyDish = {
  copyDish: UseMutationResult<Dish | null, Error, Dish>;
};

export function useCopyDish(): UseCopyDish {
  const { userCollectionId } = useAuth();
  const navigate = useNavigate();

  const copyDish = useMutation({
    mutationFn: (originalDish: Dish) =>
      dishesService.copyDish(originalDish, userCollectionId),
    onSuccess: (dish: Dish | null) =>
      dish ? navigate(`/dishes/${dish.id}/edit`) : navigate(`/dishes/`),
  });

  return {
    copyDish,
  };
}
