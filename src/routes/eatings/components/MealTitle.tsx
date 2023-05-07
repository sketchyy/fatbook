import FoodValue from "@/shared/components/FoodValue";
import { Meals } from "@/shared/models/Meals";
import dateService from "@/shared/services/dateService";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

function MealTitle({ logDay, meal, day }) {
  const eatingPath = `/eatings/${dateService.format(day)}/${meal}`;
  const addEatingFormPath = eatingPath + "/add";
  const mealData = logDay.meals[meal];

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
      <FoodValue
        foodValue={mealData.totalFoodValue}
        className="level-left is-size-7"
      />
    </div>
  );
}

export default MealTitle;
