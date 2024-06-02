import FoodValue from "@/components/FoodValue";
import DatePicker from "@/components/ui/DatePicker";
import {
  formatDate,
  getNextDay,
  getPrevDay,
  isToday as checkIsToday,
  now,
  parse,
} from "@/utils/date-utils";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import MealCards from "../../components/eatings/MealCards";
import { DailyEatings } from "@/types/eating";
import { useIsLoading } from "@/hooks/use-is-loading";
import { DAILY_EATINGS_QUERY_KEY } from "@/pages/eatings/Eatings";

function EatingsSummary() {
  const navigate = useNavigate();
  const { day, dailyEatings } = useOutletContext<{
    day: string;
    dailyEatings: DailyEatings;
  }>();
  const [activeIndex, setActiveIndex] = useState(-1);
  const isToday = checkIsToday(day);
  const parsedDay = parse(day);
  const isLoading = useIsLoading(DAILY_EATINGS_QUERY_KEY);

  const handleDayChange = (date) => {
    const selectedDay = formatDate(date);
    setActiveIndex(-1);
    navigate(`/eatings/${selectedDay}`);
  };

  const handleBackClick = () => {
    const newDate = getPrevDay(parsedDay);
    handleDayChange(newDate);
  };
  const handleForwardClick = () => {
    const newDate = getNextDay(parsedDay);
    handleDayChange(newDate);
  };
  const handleTodayClick = () => {
    const newDate = now();
    handleDayChange(newDate);
  };

  return (
    <>
      <div className="box mb-4">
        <div className="is-flex is-flex-wrap-wrap is-justify-content-space-between is-gap-2 mb-5">
          <div
            className="level is-mobile flex-1 mb-0"
            style={{ height: "40px" }}
          >
            <div className="level-left is-flex-direction-row">
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
                  <button className="button  ml-4" onClick={handleTodayClick}>
                    To Today
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="level is-mobile is-gap-0 mb-0 flex-1">
            <button className="button" onClick={handleBackClick}>
              <span className="icon is-small">
                <FaChevronLeft />
              </span>
            </button>
            <DatePicker
              selected={parsedDay}
              onChange={(e) => handleDayChange(e)}
              withIcon={true}
              width={200}
            />
            <button className="button" onClick={handleForwardClick}>
              <span className="icon is-small">
                <FaChevronRight />
              </span>
            </button>
          </div>
        </div>
        <div className="block level is-mobile">
          <FoodValue
            source={dailyEatings}
            isLoading={isLoading}
            className="level-left is-size-7"
          />
        </div>
      </div>
      <MealCards activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
    </>
  );
}

export default EatingsSummary;
