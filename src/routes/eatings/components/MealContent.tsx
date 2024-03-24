import EditDishPortionsForm from "@/shared/components/dish-portions-form/EditDishPortionsForm";
import { DailyEatings } from "@/types/eating";
import { MealType } from "@/shared/models/Meals";
import { DishPortion } from "@/types/dish-portion";
import { useMutation, useQueryClient } from "react-query";
import eatingsService from "@/services/eatings-service";
import Confirm, { Confirmation } from "@/shared/components/ui/Confirm";
import { useState } from "react";
import { useParams } from "react-router-dom";

type Props = {
  dailyEatings: DailyEatings;
  meal: MealType;
};

function MealContent({ dailyEatings, meal }: Props) {
  const { day } = useParams();
  const mealData = dailyEatings.meals[meal];
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries(["dailyEatings", day]);
  const updateEating = useMutation({
    mutationFn: (portion: DishPortion) => eatingsService.updateEating(portion),
    onSuccess,
  });
  const deleteEating = useMutation({
    mutationFn: (portion: DishPortion) => eatingsService.deleteEating(portion),
    onSuccess,
  });

  const handleDaySave = async (portion: DishPortion) => {
    updateEating.mutate(portion);
  };

  const handleAddEatingDelete = async (portion: DishPortion) => {
    setConfirm({
      visible: true,
      accept: async () => {
        setConfirm({ visible: false });
        deleteEating.mutate(portion);
      },
    });
  };

  return (
    <div className="mt-3">
      <EditDishPortionsForm
        dishPortions={mealData.eatings}
        onSave={handleDaySave}
        onDelete={handleAddEatingDelete}
      />
      <Confirm
        message="Are you sure you want to delete this eating?"
        visible={confirm.visible}
        onConfirm={confirm.accept}
        onClose={() => setConfirm({ visible: false })}
      />
    </div>
  );
}

export default MealContent;
