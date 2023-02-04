import { Fragment, useState } from "react";
import Accordion, { AccordionItem } from "../../Accordion";
import Divider from "../../Divider";
import DishPortionInputItem from "./DishPortionsListItem";
import DishPortionTitle from "./DishPortionTitle";

function DishPortionsList({
  dishPortions,
  onSubmit,
  onDelete,
  submitBtn,
  isSubmitVisible,
  isDeleteVisible,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleSubmit = (portion) => {
    setActiveIndex(-1);
    onSubmit(portion);
  };

  const handleDelete = (portion) => {
    setActiveIndex(-1);
    onDelete(portion);
  };

  return (
    <Fragment>
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
              dishPortion.selected ? "has-background-success-light" : ""
            }
          >
            <DishPortionInputItem
              dishPortion={dishPortion}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              submitBtn={submitBtn}
              isSubmitVisible={isSubmitVisible}
              isDeleteVisible={isDeleteVisible}
            />
          </AccordionItem>
        ))}
      </Accordion>
    </Fragment>
  );
}

export default DishPortionsList;
