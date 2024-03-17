import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import dishesService from "@/services/dishes-service";
import { isNull } from "@/utils/is-null";

export function useDishesSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.has("q") ? searchParams.getAll("q")[0] : "";

  const {
    data: dishes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dishes", query],
    queryFn: () => dishesService.searchDishes(query),
  });

  const runSearch = (query: string) => {
    if (isNull(query)) {
      setSearchParams({});
    } else {
      setSearchParams({ q: query });
    }
  };

  return { dishes: dishes ?? [], isLoading, isError, query, runSearch };
}
