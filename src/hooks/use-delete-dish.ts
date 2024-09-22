import { useMutation } from "@tanstack/react-query";
import { dishesService } from "@/services/dishes-service";

export function useDeleteDish() {
  const deleteDish = useMutation({ mutationFn: dishesService.deleteDish });

  return {
    deleteDish,
  };
}
