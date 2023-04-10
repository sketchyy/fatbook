import { useState } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { DishPortion } from "../../models/DishPortion";
import foodValueService from "../../services/foodValueService";
import uuidService from "../../services/uuidService";
import PageTitle from "../PageTitle";
import SearchBar from "../ui/SearchBar";
import DishPortionsList from "./DishPortionsList";

function SelectDishPortionsForm({
  title,
  subtitle,
  onAdd,
  onUpdate,
  onDelete,
}) {
  const submit = useSubmit();
  const { searchResult, q } = useLoaderData() as any;
  const [selectedPortions, setSelectedPortions] = useState<DishPortion[]>([]);

  const dishPortions = searchResult.map((dish) => ({
    dish: dish,
    servingSize: null,
  }));
  const selectedIds = selectedPortions.map((p) => p.dish.id);
  const renderedPortions = [
    ...selectedPortions,
    ...dishPortions.filter((portion) => !selectedIds.includes(portion.dish.id)),
  ];

  const handleAddClick = (portion: DishPortion) => {
    portion.id = uuidService.get();
    // Only for rendering, actual submitted calculated in logDay.
    portion.totalFoodValue =
      foodValueService.calculateFoodValueForPortion(portion);

    const updatedSelectedPortions = [
      ...selectedPortions,
      { ...portion, selected: true },
    ];

    setSelectedPortions(updatedSelectedPortions);

    onAdd(portion);
  };

  const handleUpdateClick = (portion: DishPortion) => {
    // Only for rendering, actual submitted calculated in logDay.
    portion.totalFoodValue =
      foodValueService.calculateFoodValueForPortion(portion);

    const portionIndex = selectedPortions.findIndex((p) => p.id === portion.id);
    if (portionIndex > -1) {
      selectedPortions[portionIndex] = portion;
    }

    setSelectedPortions([...selectedPortions]);

    onUpdate(portion);
  };

  const handleDeleteClick = (portion) => {
    delete portion.selected;
    const updatedSelectedPortions = selectedPortions.filter(
      (p) => p.dish.id !== portion.dish.id
    );

    setSelectedPortions(updatedSelectedPortions);

    onDelete(portion);
  };

  return (
    <div className="block">
      <div className="box">
        <PageTitle title={title} subtitle={subtitle} backPath={-1} />

        <SearchBar
          defaultValue={q}
          onChange={(event) => {
            submit(event.target.form, { replace: true });
          }}
        />

        <DishPortionsList
          dishPortions={renderedPortions}
          onAdd={handleAddClick}
          onUpdate={handleUpdateClick}
          onDelete={handleDeleteClick}
          isAdded={(p) => p.selected}
        />
      </div>
    </div>
  );
}

export default SelectDishPortionsForm;
