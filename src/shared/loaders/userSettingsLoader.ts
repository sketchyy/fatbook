import userSettingsService from "../../core/firebase/userSettingsService";

export async function userSettingsLoader({ request }) {
  return await userSettingsService.get();
}
