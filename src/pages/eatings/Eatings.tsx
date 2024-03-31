import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchDailyEatings } from "@/services/eatings-service";
import { useAuth } from "@/context/Auth";

/* EatingsPage */
function Eatings() {
  const { userId } = useAuth();
  const params = useParams();
  const day = params.day;

  /* TODO: useDailyEatings()
   *   const day = params.day
   *  use
   * */
  const { data: dailyEatings, isLoading } = useQuery({
    queryKey: ["dailyEatings", day],
    queryFn: () => fetchDailyEatings(userId, day!),
  });

  if (isLoading) {
    /* TODO: Meals page skeleton */
    return <span>"Loading..."</span>;
  }

  return <Outlet context={{ day, dailyEatings }} />;
}

export default Eatings;
