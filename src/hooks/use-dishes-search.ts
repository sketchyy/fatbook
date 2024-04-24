import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchDishes } from "@/services/dishes-service";
import { isNil } from "@/utils/is-nil";

type RunSearchOptions = {
  replace?: boolean;
};

type Props = {
  filterDishId?: number;
  filterEmpty?: boolean;
};
export function useDishesSearch({ filterDishId, filterEmpty }: Props = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.has("q") ? searchParams.getAll("q")[0] : "";

  const {
    data: dishes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dishes", query, { filterEmpty }],
    queryFn: () => searchDishes({ query, filterDishId, filterEmpty }),
  });

  const runSearch = (query: string, { replace }: RunSearchOptions = {}) => {
    if (isNil(query)) {
      setSearchParams({}, { replace: replace ?? false });
    } else {
      setSearchParams({ q: query }, { replace: replace ?? false });
    }
  };

  return { dishes: dishes ?? [], isLoading, isError, query, runSearch };
}
