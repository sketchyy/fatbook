import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { Dish } from "@/types/dish";
import { updateDish } from "@/services/dishes-service";
import { TablesUpdate } from "@/types/supabase.types";

type UseDishMutations = {
  update: UseMutationResult<Dish | null, unknown, TablesUpdate<"dishes">>;
};

export function useDishMutations(id: number): UseDishMutations {
  const queryClient = useQueryClient();

  const onSuccess = () => queryClient.invalidateQueries({ queryKey: ["dish"] });

  const update = useMutation({
    mutationFn: (values: TablesUpdate<"dishes">) => updateDish(id, values),
    onSuccess,
  });

  return {
    update,
  };
}
