import { useOutletContext } from "react-router-dom";
import DishIngredients from "@/pages/dish/DishIngredients";
import PageTitle from "@/components/PageTitle";
import { FaChevronDown, FaPlus } from "react-icons/fa";
import DishListSkeleton from "@/components/ui/DishListSkeleton";

const DishIngredientsSkeleton = () => {
  return (
    <div className="box">
      <PageTitle className="mb-0 pb-4" isLoading>
        <button className="button is-primary is-skeleton">
          <span className="icon">
            <FaPlus />
          </span>
          <span>Add</span>
        </button>
      </PageTitle>

      <div className="is-flex is-justify-content-end mt-4 mb-2">
        <button className="button is-small is-rounded is-skeleton">
          <span className="mr-2">Cooking</span>
          <FaChevronDown />
        </button>
      </div>

      <DishListSkeleton />
    </div>
  );
};

/* Separate function as there is a tricky state management due to optimistic updates */
export default function DishIngredientsLoader() {
  const { isLoading } = useOutletContext<{ isLoading: boolean }>();

  if (isLoading) {
    return <DishIngredientsSkeleton />;
  }

  return <DishIngredients />;
}
