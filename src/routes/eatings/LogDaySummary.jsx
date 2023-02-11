import React, { Fragment } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useOutletContext } from "react-router-dom";
import FoodValue from "../../shared/components/FoodValue";
import dateService from "../../shared/services/dateService";
import MealCard from "./MealCard";

function LogDaySummary({ onDayChange }) {
  const navigate = useNavigate();
  const { day, logDay } = useOutletContext();
  const isToday = dateService.isSame(dateService.now(), day);
  const parsedDay = dateService.format(dateService.parse(day), "YYYY-MM-DD");

  const handleDayChange = (date) => {
    console.log("qweqwe=", date);
    const selectedDay = dateService.format(date);
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
    <Fragment>
      <div className="box mb-4">
        <div className="level block">
          <div className="level-left">
            <div className="level is-mobile mb-0">
              <div className="level-left">
                <div className="level-item">
                  <span className="is-size-3">📝</span>
                </div>
                <div className="level-item">
                  <span className="is-size-4">Summary</span>
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
              <div>
                <input
                  type="date"
                  className="input"
                  value={parsedDay}
                  onChange={(e) => handleDayChange(e.target.value)}
                />
              </div>
              <button className="button" onClick={handleForwardClick}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="block level is-mobile">
          <FoodValue
            foodValue={logDay.totalFoodValue}
            className="level-left is-size-6"
          />
        </div>
      </div>
      <MealCard />
    </Fragment>
  );
}

export default LogDaySummary;
