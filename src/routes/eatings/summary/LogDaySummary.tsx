import FoodValue from "@/components/FoodValue";
import DatePicker from "@/components/ui/DatePicker";
import dateService from "@/shared/services/dateService";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import MealCards from "../components/MealCards";
import { DailyEatings } from "@/types/eating";

function LogDaySummary() {
  const navigate = useNavigate();
  const { day, dailyEatings } = useOutletContext<{
    day: string;
    dailyEatings: DailyEatings;
  }>();
  const [activeIndex, setActiveIndex] = useState(-1);
  const isToday = dateService.isSame(dateService.now(), day);
  const parsedDay = dateService.parse(day);

  const handleDayChange = (date) => {
    const selectedDay = dateService.format(date);
    setActiveIndex(-1);
    navigate(`/eatings/${selectedDay}`);
  };

  const handleBackClick = () => {
    const newDate = dateService.getPrevDay(day);
    handleDayChange(newDate);
  };
  const handleForwardClick = () => {
    const newDate = dateService.getNextDay(day);
    handleDayChange(newDate);
  };
  const handleTodayClick = () => {
    const newDate = dateService.now();
    handleDayChange(newDate);
  };

  return (
    <>
      <div className="box mb-4">
        <div className="level block">
          <div className="level-left">
            <div className="level is-mobile mb-0">
              <div className="level-left">
                <div className="level-item">
                  <span className="is-size-5">📝</span>
                </div>
                <div className="level-item">
                  <span className="is-size-5">Summary</span>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  {!isToday && (
                    <button className="button ml-4" onClick={handleTodayClick}>
                      To Today
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="level-right">
            <div className="level is-mobile mb-0">
              <button className="button" onClick={handleBackClick}>
                <FaChevronLeft />
              </button>
              <DatePicker
                selected={parsedDay}
                onChange={(e) => handleDayChange(e)}
                withIcon={true}
                width={200}
              />
              <button className="button" onClick={handleForwardClick}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="block level is-mobile">
          <FoodValue
            proteins={dailyEatings.proteins}
            fats={dailyEatings.fats}
            carbs={dailyEatings.carbs}
            calories={dailyEatings.calories}
            className="level-left is-size-7"
          />
        </div>
      </div>
      <MealCards activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </>
  );
}

export default LogDaySummary;
