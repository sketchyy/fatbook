import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { NutritionFacts } from "@/types/nutrition-facts";

interface FoodValueDiffProps {
  foodValue: NutritionFacts;
}

const FoodValueDiffItem = ({
  value,
  measure,
  successColor = "has-text-success-dark",
  failColor = "has-text-danger-dark",
}) => {
  const className = value >= 0 ? failColor : successColor;
  const icon = value >= 0 ? <FaArrowUp /> : <FaArrowDown />;
  return (
    <strong className={"mr-3 is-size-7 " + className}>
      {icon} {Math.round(value)} {measure}
    </strong>
  );
};

function FoodValueDiff({ foodValue }: FoodValueDiffProps) {
  return (
    <span className="level level-left mb-0">
      <FoodValueDiffItem value={foodValue.calories} measure="kcal" />
      <FoodValueDiffItem
        value={foodValue.proteins}
        measure="g"
        successColor="has-text-danger-dark"
        failColor="has-text-success-dark"
      />
      <FoodValueDiffItem value={foodValue.fats} measure="g" />
      <FoodValueDiffItem value={foodValue.carbs} measure="g" />
    </span>
  );
}

export default FoodValueDiff;
