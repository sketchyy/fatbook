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
  const addEating = useMutation({
    mutationFn: (portion: DishPortion) =>
      eatingsService.createEating(user?.id!, day!, meal!, portion),
    onSuccess: () => queryClient.invalidateQueries(["dailyEatings", day]),
  });

  const handleAddEating = async (portion: DishPortion) => {
    addEating.mutate(portion);
  };

  const handleUpdateEatings = async (portion) => {
    const logDay = await eatingsService2.getOrCreateLogDay(day);

    logDay.updateEating(meal, portion);

    await eatingsService2.replaceLogDay(day, logDay);
  };

  const handleDeleteEatings = async (portion) => {
    const logDay = await eatingsService2.getOrCreateLogDay(day);

    logDay.deleteEating(meal, portion);

    await eatingsService2.replaceLogDay(day, logDay);
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
