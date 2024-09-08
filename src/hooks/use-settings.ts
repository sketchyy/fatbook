import { useQuery } from "@tanstack/react-query";
import { settingsService } from "@/services/settings-service";
import { useAuth } from "@/context/Auth";

export function useSettings() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsService.fetchSettings(userId),
  });
}
