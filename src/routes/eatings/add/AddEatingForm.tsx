import eatingsService from "@/core/firebase/eatingsService";
import SelectDishPortionsForm from "@/shared/components/dish-portions-form/SelectDishPortionsForm";
import dateService from "@/shared/services/dateService";
import { useParams } from "react-router-dom";

function AddEatingForm() {
  const { day, meal } = useParams();

  const handleAddEatings = async (portion) => {
    const logDay = await eatingsService.getOrCreateLogDay(day);

    logDay.addEatings(meal, [portion]);

    await eatingsService.replaceLogDay(day, logDay);
  };

  const handleUpdateEatings = async (portion) => {
    const logDay = await eatingsService.getOrCreateLogDay(day);

    logDay.updateEating(meal, portion);

    await eatingsService.replaceLogDay(day, logDay);
  };

  const handleDeleteEatings = async (portion) => {
    const logDay = await eatingsService.getOrCreateLogDay(day);

    logDay.deleteEating(meal, portion);

    await eatingsService.replaceLogDay(day, logDay);
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
      onAdd={handleAddEatings}
      onUpdate={handleUpdateEatings}
      onDelete={handleDeleteEatings}
    />
  );
}

export default AddEatingForm;
