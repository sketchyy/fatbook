import FoodValue from "@/components/FoodValue";
import { Meals, MealType } from "@/types/meals";
import { formatDate } from "@/utils/date-utils";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DailyEatings } from "@/types/eating";
import { clsx } from "clsx";

type Props = {
  dailyEatings?: DailyEatings | null;
  meal: MealType;
  day: string;
  isLoading?: boolean;
};

function MealTitle({ dailyEatings, meal, day, isLoading }: Props) {
  const eatingPath = `/eatings/${formatDate(day)}/${meal}`;
  const addEatingFormPath = eatingPath + "/add";
  const mealData = dailyEatings?.meals[meal];

  return (
    <div className="is-clickable">
      <div className="level mb-1 is-mobile">
        <div className="level-left is-flex-direction-row">
          <span className="is-size-4">{Meals[meal].icon}</span>
          <span className="is-size-5">{Meals[meal].title}</span>
        </div>
        <div className="level-right">
          <Link
            to={addEatingFormPath}
            className={clsx("button is-primary", {
              "is-skeleton": isLoading,
            })}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="icon">
              <FaPlus />
            </span>
          </Link>
        </div>
      </div>
      <FoodValue
        source={mealData}
        isLoading={isLoading}
        className="level-left is-size-7"
      />
    </div>
  );
}

export default MealTitle;
