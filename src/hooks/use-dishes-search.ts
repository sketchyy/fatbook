import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchDishes } from "@/services/dishes-service";
import { isNil } from "@/utils/is-nil";

export function useDishesSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.has("q") ? searchParams.getAll("q")[0] : "";

  const {
    data: dishes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dishes", query],
    queryFn: () => searchDishes(query),
  });

  const runSearch = (query: string) => {
    if (isNil(query)) {
      setSearchParams({});
    } else {
      setSearchParams({ q: query });
    }
  };

  return { dishes: dishes ?? [], isLoading, isError, query, runSearch };
}
