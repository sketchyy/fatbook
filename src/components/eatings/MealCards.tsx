import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import { Meals, MealType } from "@/types/meals";
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
            <MealContent dailyEatings={dailyEatings} meal={meal as MealType} />
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default MealCards;
