import { DishPortionOld } from "@/shared/models/DishPortionOld";
import { useState } from "react";
import Accordion, { AccordionItem } from "../../ui/Accordion";
import Divider from "../../ui/Divider";

import DishPortionListItem from "./DishPortionListItem";
import DishPortionTitle from "./DishPortionTitle";

interface DishPortionsListProps {
  dishPortions: DishPortionOld[];
  onAdd?: (p: DishPortionOld) => void;
  onUpdate: (p: DishPortionOld) => void;
  onDelete: (p: DishPortionOld) => void;
  isAdded: (p: DishPortionOld) => boolean;
}

function DishPortionList({
  dishPortions,
  onAdd,
  onUpdate,
  onDelete,
  isAdded,
}: DishPortionsListProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [prevItems, setPrevItems] = useState(dishPortions);

  // Reset selection after search
  if (dishPortions !== prevItems) {
    setPrevItems(dishPortions);
    setActiveIndex(-1);
  }

  const handleAdd = (portion: DishPortionOld) => {
    setActiveIndex(-1);
    if (onAdd) {
      onAdd(portion);
    }
  };

  const handleUpdate = (portion: DishPortionOld) => {
    setActiveIndex(-1);
    onUpdate(portion);
  };

  const handleDelete = (portion: DishPortionOld) => {
    setActiveIndex(-1);
    onDelete(portion);
  };

  return (
    <>
      <Divider />

      {dishPortions.length === 0 && (
        <p className="has-text-centered mt-3">Nothing was found.</p>
      )}

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
