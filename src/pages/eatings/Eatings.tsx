import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchDailyEatings } from "@/services/eatings-service";
import { useAuth } from "@/context/Auth";

export const DAILY_EATINGS_KEY = "dailyEatings";

/* EatingsPage */
function Eatings() {
  const { userId } = useAuth();
  const params = useParams();
  const day = params.day;

  const { data: dailyEatings } = useQuery({
    queryKey: [DAILY_EATINGS_KEY, day],
    queryFn: () => fetchDailyEatings(userId, day!),
  });

  return <Outlet context={{ day, dailyEatings }} />;
}

export default Eatings;
