import DishList from "@/shared/components/dish/DishList";
import PageTitle from "@/shared/components/PageTitle";
import SearchBar from "@/shared/components/ui/SearchBar";
import { Form, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import dishesService from "@/services/dishes-service";
import { Dish } from "@/types/dish";

function DishesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.has("q") ? searchParams.getAll("q")[0] : "";
  const { data: dishes, isLoading } = useQuery(["dishes", query], () =>
    dishesService.searchDishes(query),
  );

  const handleDishClick = (dish: Dish) => {
    navigate(`/dishes/${dish.id}`);
  };

  const handleSearch = (event) => setSearchParams({ q: event.target.value });

  return (
    <div className="box">
      <PageTitle title="My Dishes" subtitle="Recently used">
        <Form method="post">
          <button className="button is-success">New</button>
        </Form>
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
