import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
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
    // Skeleton is currently used. This is how to keep previous data:
    placeholderData: keepPreviousData,
  });

  const runSearch = (query: string, { replace }: RunSearchOptions = {}) => {
    const queryParams = new URLSearchParams();

    if (!isNil(query)) {
      queryParams.append("q", query);
    }

    setSearchParams(queryParams, { replace: replace ?? false });
  };

  return { dishes: dishes ?? [], isLoading, isError, query, runSearch };
}
