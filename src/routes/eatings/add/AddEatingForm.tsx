import eatingsService2 from "@/core/firebase/eatingsServiceOld";
import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import dateService from "@/shared/services/dateService";
import { useParams } from "react-router-dom";
import { DishPortion } from "@/types/dish-portion";
import { useAuth } from "@/contexts/Auth";
import eatingsService from "@/services/eatings-service";
import { useMutation, useQueryClient } from "react-query";

function AddEatingForm() {
  const { day, meal } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  /* TODO: Refactor: const {addEating, updateEating, deleteEating} = useEatingMutations() */
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

  const handleAddEating = async (portion: DishPortion) => {
    addEating.mutate(portion);
  };

  const handleUpdateEatings = async (portion: DishPortion) => {
    updateEating.mutate(portion);
  };

  const handleDeleteEatings = async (portion) => {
    deleteEating.mutate(portion);
  };

  const getSubtitle = () => {
    const today = dateService.now();
    if (dateService.isSame(day, today)) {
      return `${meal}, Today`;
    }

    const yesterday = dateService.subtractDays(today, 1);
    if (dateService.isSame(day, yesterday)) {
      return `${meal}, Yesterday`;
    }

    return `${meal}, ${day}`;
  };

  return (
    <SelectDishPortionsForm
      title="Select Dish"
      subtitle={getSubtitle()}
      onAdd={handleAddEating}
      onUpdate={handleUpdateEatings}
      onDelete={handleDeleteEatings}
    />
  );
}

export default AddEatingForm;
