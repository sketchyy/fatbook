import { useQuery } from "react-query";
import settingsService from "@/services/settings-service";

export function useSettings(userId: string) {
  return useQuery({
    queryKey: "settings",
    queryFn: () => settingsService.getSettings(userId),
  });
}
