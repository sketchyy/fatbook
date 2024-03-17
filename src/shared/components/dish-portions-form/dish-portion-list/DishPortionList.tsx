import { useState } from "react";
import Accordion, { AccordionItem } from "../../ui/Accordion";
import Divider from "../../ui/Divider";

import DishPortionListItem from "./DishPortionListItem";
import DishPortionTitle from "./DishPortionTitle";
import { isNull } from "@/utils/is-null";
import { DishPortion, DishPortionInputs } from "@/types/dish-portion";

interface Props {
  dishPortions?: DishPortionInputs[];
  onAdd?: (p: DishPortionInputs) => void;
  onUpdate: (p: DishPortionInputs) => void;
  onDelete: (p: DishPortionInputs) => void;
  isAdded: (p: DishPortionInputs) => boolean;
}

function DishPortionList({
  dishPortions,
  onAdd,
  onUpdate,
  onDelete,
  isAdded,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [prevItems, setPrevItems] = useState(dishPortions);

  if (isNull(dishPortions) || dishPortions.length === 0) {
    return (
      <>
        <Divider />
        <p className="has-text-centered mt-3">Nothing was found.</p>
      </>
    );
  }

  // Reset selection after search
  if (dishPortions !== prevItems) {
    setPrevItems(dishPortions);
    setActiveIndex(-1);
  }

  const handleAdd = (portion: DishPortionInputs) => {
    setActiveIndex(-1);
    if (onAdd) {
      onAdd(portion);
    }
  };

  const handleUpdate = (portion: DishPortionInputs) => {
    setActiveIndex(-1);
    onUpdate(portion);
  };

  const handleDelete = (portion: DishPortionInputs) => {
    setActiveIndex(-1);
    onDelete(portion);
  };

  return (
    <>
      <Divider />

      <Accordion
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {dishPortions.map((dishPortion, i) => (
          <AccordionItem
            key={dishPortion.dish.id + "-" + i}
            title={<DishPortionTitle dishPortion={dishPortion} />}
            className={
              "has-border-bottom-grey " +
              (dishPortion.selected ? "has-background-success-light" : "")
            }
            selectedClassName="has-background-info-light"
          >
            <DishPortionListItem
              focused={i === activeIndex}
              dishPortion={dishPortion}
              onAdd={handleAdd}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              isAdded={isAdded}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default DishPortionList;
