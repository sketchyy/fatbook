import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import eatingsService from "@/services/eatings-service";
import { useAuth } from "@/contexts/Auth";

/* EatingsPage */
function LogDayPage() {
  const { user } = useAuth();
  const params = useParams();
  const day = params.day;

  /* TODO: useDailyEatings()
   *   const day = params.day
   *  use
   * */
  const { data: dailyEatings, isLoading } = useQuery({
    queryKey: ["dailyEatings", day],
    queryFn: () => eatingsService.getDailyEatings(user?.id!, day!),
  });

  if (isLoading) {
    /* TODO: Meals page skeleton */
    return <span>"Loading..."</span>;
  }

  return <Outlet context={{ day, dailyEatings }} />;
}

export default LogDayPage;
