import eatingsService from "@/core/firebase/eatingsService";
import Accordion, { AccordionItem } from "@/shared/components/ui/Accordion";
import Confirm, { Confirmation } from "@/shared/components/ui/Confirm";
import { Meals } from "@/shared/models/Meals";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import MealContent from "./MealContent";
import MealTitle from "./MealTitle";

interface MealCardsProps {
  activeIndex: number;
  setActiveIndex: (number) => void;
}

function MealCards({ activeIndex, setActiveIndex }: MealCardsProps) {
  const { day, logDay } = useOutletContext<any>();
  const [confirm, setConfirm] = useState<Confirmation>({
    visible: false,
  });

  const handleDaySave = async (meal, portion) => {
    const logDay = await eatingsService.getOrCreateLogDay(day);

    logDay.updateEating(meal, portion);

    await eatingsService.replaceLogDay(day, logDay);
  };

  const handleAddEatingDelete = async (meal, portion) => {
    setConfirm({
      visible: true,
      accept: async () => {
        setConfirm({ visible: false });
        const logDay = await eatingsService.getOrCreateLogDay(day);

        logDay.deleteEating(meal, portion);

        await eatingsService.replaceLogDay(day, logDay);
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
            title={<MealTitle logDay={logDay} meal={meal} day={day} />}
            className="box mb-4"
            selectedStyle={{
              width: "104%",
              marginLeft: "-2%",
            }}
          >
            <MealContent
              logDay={logDay}
              meal={meal}
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
