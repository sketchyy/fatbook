import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { dishesService } from "@/services/dishes-service";
import { useAuth } from "@/context/Auth";
import { useNavigate } from "react-router-dom";
import { DishModel } from "@/types/dish";

type UseCreateDish = {
  createDish: UseMutationResult<DishModel | null, Error, void>;
};

export function useCreateDish(): UseCreateDish {
  const { userCollectionId } = useAuth();
  const navigate = useNavigate();

  const createDish = useMutation({
    mutationFn: () =>
      dishesService.createDish({ name: "", collectionId: userCollectionId }),
    onSuccess: (dish: DishModel | null) =>
      dish ? navigate(`/dishes/${dish.id}/edit`) : navigate(`/dishes/`),
  });

  return {
    createDish,
  };
}
