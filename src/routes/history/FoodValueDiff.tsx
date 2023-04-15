import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { FoodValue } from "../../shared/models/FoodValue";

interface FoodValueDiffProps {
  foodValue: FoodValue;
}

const FoodValueDiffItem = ({ value, measure }) => {
  const className =
    value >= 0 ? "has-text-success-dark" : "has-text-danger-dark";
  const icon = value >= 0 ? <FaArrowDown /> : <FaArrowUp />;
  return (
    <strong className={"mr-3 is-size-7 " + className}>
      {icon} {Math.round(value)} {measure}
    </strong>
  );
};

function FoodValueDiff({ foodValue }: FoodValueDiffProps) {
  return (
    <span className="level level-left">
      <FoodValueDiffItem value={foodValue.calories} measure="kcal" />
      <FoodValueDiffItem value={foodValue.proteins} measure="g" />
      <FoodValueDiffItem value={foodValue.fats} measure="g" />
      <FoodValueDiffItem value={foodValue.carbs} measure="g" />
    </span>
  );
}

export default FoodValueDiff;
