import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { createDish } from "@/services/dishes-service";
import { useAuth } from "@/context/Auth";
import { useNavigate } from "react-router-dom";
import { Dish, DishModel } from "@/types/dish";

type UseCreateDish = {
  create: UseMutationResult<DishModel | null, Error, void>;
};

export function useCreateDish(): UseCreateDish {
  const { userCollectionId } = useAuth();
  const navigate = useNavigate();

  const create = useMutation({
    mutationFn: () => createDish({ name: "", collectionId: userCollectionId }),
    onSuccess: (dish: DishModel | null) =>
      dish ? navigate(`/dishes/${dish.id}/edit`) : navigate(`/dishes/`),
  });

  return {
    create,
  };
}
