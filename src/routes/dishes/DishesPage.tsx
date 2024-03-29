import DishList from "@/components/dish/DishList";
import PageTitle from "@/components/PageTitle";
import SearchBar from "@/components/ui/SearchBar";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import dishesService from "@/services/dishes-service";
import { Dish } from "@/types/dish";
import { useDishesSearch } from "@/hooks/use-dishes-search";
import { ChangeEvent } from "react";

function DishesPage() {
  const navigate = useNavigate();
  const { dishes, isLoading, query, runSearch } = useDishesSearch();
  const createDish = useMutation({
    mutationFn: () => dishesService.createDish({ name: "" }),
    onSuccess: (dish) =>
      dish ? navigate(`/dishes/${dish.id}/edit`) : navigate(`/dishes/`),
  });

  const handleDishClick = (dish: Dish) => {
    navigate(`/dishes/${dish.id}`);
  };

  const handleNewClick = () => {
    createDish.mutate();
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) =>
    runSearch(event.target.value);

  return (
    <div className="box">
      <PageTitle title="My Dishes" subtitle="Recently used">
        <button className="button is-success" onClick={handleNewClick}>
          New
        </button>
      </PageTitle>

      <SearchBar
        isLoading={isLoading}
        defaultValue={query}
        onChange={handleSearch}
      />

      {dishes && <DishList dishes={dishes} onDishClick={handleDishClick} />}
    </div>
  );
}

export default DishesPage;
