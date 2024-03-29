import { useQuery } from "react-query";
import settingsService from "@/services/settings-service";
import { useAuth } from "@/contexts/Auth";

export function useSettings() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: "settings",
    queryFn: () => settingsService.getSettings(userId),
  });
}
