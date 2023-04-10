import { useParams } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import SelectDishPortionsForm from "../../shared/components/dish-portions-form/SelectDishPortionsForm";
import dateService from "../../shared/services/dateService";

function AddEatingForm() {
  const { day, meal } = useParams();

  const handleAddEatings = async (portion) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.addEatings(meal, [portion]);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  const handleUpdateEatings = async (portion) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.updateEating(meal, portion);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  const handleDeleteEatings = async (portion) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.deleteEating(meal, portion);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  const renderSubtitle = () => {
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
      subtitle={renderSubtitle()}
      onAdd={handleAddEatings}
      onUpdate={handleUpdateEatings}
      onDelete={handleDeleteEatings}
    />
  );
}

export default AddEatingForm;
