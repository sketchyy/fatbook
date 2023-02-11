import React, { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link, useOutletContext } from "react-router-dom";
import eatingsDbService from "../../core/firebase/eatingsDbService";
import EditDishPortionsForm from "../../shared/components/dish-portions-form/EditDishPortionsForm";
import FoodValue from "../../shared/components/FoodValue";
import Accordion, { AccordionItem } from "../../shared/components/ui/Accordion";
import dateService from "../../shared/services/dateService";

export const meals = {
  breakfast: {
    icon: "🥪",
    title: "Breakfast",
  },
  lunch: {
    icon: "🍔",
    title: "Lunch",
  },
  dinner: {
    icon: "🍗",
    title: "Dinner",
  },
  snack: {
    icon: "🍟",
    title: "Snack",
  },
};

function MealCard({}) {
  const { day, logDay } = useOutletContext();
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleDaySave = async (meal, portion) => {
    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.updateEating(meal, portion);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  const handleAddEatingDelete = async (meal, portion) => {
    if (!window.confirm("Are you sure you want to delete this eating?")) {
      return;
    }

    const logDay = await eatingsDbService.getOrCreateLogDay(day);

    logDay.deleteEating(meal, portion);

    await eatingsDbService.replaceLogDay(day, logDay);
  };

  const renderMealTitle = (meal) => {
    const eatingPath = `/eatings/${dateService.format(day)}/${meal}`;
    const addEatingFormPath = eatingPath + "/add";
    const mealData = logDay.meals[meal];

    return (
      <div className="is-clickable">
        <div className="level mb-1 is-mobile">
          <div className="level-left">
            <div className="level-item">
              <span className="is-size-4">{meals[meal].icon}</span>
            </div>
            <div className="level-item">
              <span className="is-size-5">{meals[meal].title}</span>
            </div>
          </div>
          <div className="level-right">
            <Link
              to={addEatingFormPath}
              className="button is-primary"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="icon">
                <FaPlus />
              </span>
            </Link>
          </div>
        </div>
        <FoodValue
          foodValue={mealData.totalFoodValue}
          className="level-left is-size-6"
        />
      </div>
    );
  };

  const renderMealContent = (meal) => {
    const mealData = logDay.meals[meal];

    return (
      <Fragment>
        <div className="mt-3">
          <EditDishPortionsForm
            dishPortions={mealData.eatings}
            emptyMessage="No eatings."
            onPortionDelete={(portion) => handleAddEatingDelete(meal, portion)}
            onSave={(portion) => handleDaySave(meal, portion)}
            onDelete={(portion) => handleAddEatingDelete(meal, portion)}
          />
        </div>
      </Fragment>
    );
  };

  return (
    <Accordion
      activeIndex={activeIndex}
      onTabChange={(e) => setActiveIndex(e.index)}
    >
      {Object.keys(meals).map((meal) => (
        <AccordionItem
          key={meal}
          title={renderMealTitle(meal)}
          className="box mb-4"
        >
          {renderMealContent(meal)}
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default MealCard;
