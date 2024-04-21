import EditDishPortionsForm from "@/components/dish-portions-form/EditDishPortionsForm";
import { DailyEatings } from "@/types/eating";
import { MealType } from "@/types/meals";
import { DishPortion } from "@/types/dish-portion";
import Confirm, { Confirmation } from "@/components/ui/Confirm";
import { useState } from "react";
import { useEatingMutations } from "@/hooks/use-eating-mutations";

type Props = {
  dailyEatings: DailyEatings;
  meal: MealType;
};

function MealContent({ dailyEatings, meal }: Props) {
  const mealData = dailyEatings.meals[meal];
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });
  const { update, remove } = useEatingMutations(meal!);

  const handleDaySave = async (portion: DishPortion) => {
    update.mutate(portion);
  };

  const handleAddEatingDelete = async (portion: DishPortion) => {
    setConfirm({
      visible: true,
      accept: async () => {
        setConfirm({ visible: false });
        remove.mutate(portion);
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
