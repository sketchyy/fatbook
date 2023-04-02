import { useParams } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import SelectDishPortionsForm from "../../shared/components/dish-portions-form/SelectDishPortionsForm";

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

  return (
    <SelectDishPortionsForm
      title="Select Dish"
      // TODO:  Render today/yesterday/date
      subtitle={`${meal}, ${day}`}
      onAdd={handleAddEatings}
      onUpdate={handleUpdateEatings}
      onDelete={handleDeleteEatings}
    />
  );
}

export default AddEatingForm;
