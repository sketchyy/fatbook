import { useQuery } from "react-query";
import { fetchSettings } from "@/services/settings-service";
import { useAuth } from "@/context/Auth";

export function useSettings() {
  const { userId } = useAuth();

  return useQuery({
    queryKey: "settings",
    queryFn: () => fetchSettings(userId),
  });
}
