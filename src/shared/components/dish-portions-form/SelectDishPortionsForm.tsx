import foodValueService from "@/shared/services/foodValueService";
import { ChangeEvent, useState } from "react";
import PageTitle from "../PageTitle";
import SearchBar from "../ui/SearchBar";
import DishPortionList from "./dish-portion-list/DishPortionList";
import { useDishesSearch } from "@/hooks/use-dishes-search";
import {
  DishPortionInputs,
  mapDishToPortionInputs,
} from "@/types/dish-portion";
import uuidService from "@/shared/services/uuidService";

type Props = {
  title: string;
  subtitle: string;
  onAdd: (ingredient: DishPortionInputs) => void;
  onDelete: (ingredient: DishPortionInputs) => void;
  onUpdate?: (ingredient: DishPortionInputs) => void;
};

function SelectDishPortionsForm({
  title,
  subtitle,
  onAdd,
  onUpdate,
  onDelete,
}: Props) {
  const { dishes, isLoading, query, runSearch } = useDishesSearch();
  const [selectedPortions, setSelectedPortions] = useState<DishPortionInputs[]>(
    [],
  );

  const dishPortions: DishPortionInputs[] = dishes.map((d) =>
    mapDishToPortionInputs(d),
  );
  const selectedIds = selectedPortions.map((p) => p.dish.id);
  const renderedPortions: DishPortionInputs[] = [
    ...selectedPortions,
    ...dishPortions.filter((portion) => !selectedIds.includes(portion.dish.id)),
  ];

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    runSearch(event.target.value);

  const handleAddClick = (portion: DishPortionInputs) => {
    portion.tempId = uuidService.get();
    // Only for rendering, actual submitted calculated in logDay.
    const foodValue = foodValueService.calculateFoodValueForPortion(portion);
    portion = { ...portion, ...foodValue };

    const updatedSelectedPortions = [
      ...selectedPortions,
      { ...portion, selected: true },
    ];

    setSelectedPortions(updatedSelectedPortions);

    onAdd(portion);
  };

  const handleUpdateClick = (portion: DishPortionInputs) => {
    // Only for rendering, actual submitted calculated in logDay.
    portion.totalFoodValue =
      foodValueService.calculateFoodValueForPortion(portion);

    const portionIndex = selectedPortions.findIndex(
      (p) => p.tempId === portion.tempId,
    );
    if (portionIndex > -1) {
      selectedPortions[portionIndex] = portion;
    }

    setSelectedPortions([...selectedPortions]);

    if (onUpdate) {
      onUpdate(portion);
    }
  };

  const handleDeleteClick = (portion) => {
    delete portion.selected;
    const updatedSelectedPortions = selectedPortions.filter(
      (p) => p.dish.id !== portion.dish.id,
    );

    setSelectedPortions(updatedSelectedPortions);

    onDelete(portion);
  };

  return (
    <div className="block">
      <div className="box">
        <PageTitle title={title} subtitle={subtitle} backPath={-1} />

        <SearchBar
          isLoading={isLoading}
          defaultValue={query}
          onChange={handleSearch}
        />

        <DishPortionList
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
