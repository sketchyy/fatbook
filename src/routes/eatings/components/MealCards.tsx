import eatingsServiceOld from "@/core/firebase/eatingsServiceOld";
import Accordion, { AccordionItem } from "@/shared/components/ui/Accordion";
import Confirm, { Confirmation } from "@/shared/components/ui/Confirm";
import { Meals, MealType } from "@/shared/models/Meals";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MealContent from "./MealContent";
import MealTitle from "./MealTitle";
import { DailyEatings } from "@/types/eating";

interface Props {
  activeIndex: number;
  setActiveIndex: (number: number) => void;
}

function MealCards({ activeIndex, setActiveIndex }: Props) {
  const { day, dailyEatings } = useOutletContext<{
    day: string;
    dailyEatings: DailyEatings;
  }>();
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });

  const handleDaySave = async (meal, portion) => {
    const logDay = await eatingsServiceOld.getOrCreateLogDay(day);

    logDay.updateEating(meal, portion);

    await eatingsServiceOld.replaceLogDay(day, logDay);
  };

  const handleAddEatingDelete = async (meal, portion) => {
    setConfirm({
      visible: true,
      accept: async () => {
        setConfirm({ visible: false });
        const logDay = await eatingsServiceOld.getOrCreateLogDay(day);

        logDay.deleteEating(meal, portion);

        await eatingsServiceOld.replaceLogDay(day, logDay);
      },
    });
  };

  return (
    <>
      <Accordion
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      >
        {Object.keys(Meals).map((meal) => (
          <AccordionItem
            key={meal}
            title={
              <MealTitle
                dailyEatings={dailyEatings}
                meal={meal as MealType}
                day={day}
              />
            }
            className="box mb-4"
            selectedStyle={{
              width: "104%",
              marginLeft: "-2%",
            }}
          >
            <MealContent
              dailyEatings={dailyEatings}
              meal={meal as MealType}
              handleAddEatingDelete={handleAddEatingDelete}
              handleDaySave={handleDaySave}
            />
          </AccordionItem>
        ))}
      </Accordion>

      <Confirm
        message="Are you sure you want to delete this eating?"
        visible={confirm.visible}
        onConfirm={confirm.accept}
        onClose={() => setConfirm({ visible: false })}
      />
    </>
  );
}

export default MealCards;
