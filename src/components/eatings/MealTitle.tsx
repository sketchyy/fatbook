import FoodValue from "@/components/FoodValue";
import { Meals, MealType } from "@/types/meals";
import dateUtils from "@/utils/date-utils";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DailyEatings } from "@/types/eating";

type Props = {
  dailyEatings: DailyEatings;
  meal: MealType;
  day: string;
};

function MealTitle({ dailyEatings, meal, day }: Props) {
  const eatingPath = `/eatings/${dateUtils.format(day)}/${meal}`;
  const addEatingFormPath = eatingPath + "/add";
  const mealData = dailyEatings.meals[meal];

  return (
    <div className="is-clickable">
      <div className="level mb-1 is-mobile">
        <div className="level-left">
          <div className="level-item">
            <span className="is-size-4">{Meals[meal].icon}</span>
          </div>
          <div className="level-item">
            <span className="is-size-5">{Meals[meal].title}</span>
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
      <FoodValue source={mealData} className="level-left is-size-7" />
    </div>
  );
}

export default MealTitle;
