import { Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { eatingsService } from "@/services/eatings-service";
import { useAuth } from "@/context/Auth";
import AppLayout from "@/components/AppLayout";

export const DAILY_EATINGS_QUERY_KEY = "dailyEatings";

/* EatingsPage */
function Eatings() {
  const { userId } = useAuth();
  const params = useParams();
  const day = params.day;

  const { data: dailyEatings } = useQuery({
    queryKey: [DAILY_EATINGS_QUERY_KEY, day],
    queryFn: () => eatingsService.fetchDailyEatings(userId, day!),
  });

  return (
    <AppLayout>
      <Outlet context={{ day, dailyEatings }} />
    </AppLayout>
  );
}

export default Eatings;
