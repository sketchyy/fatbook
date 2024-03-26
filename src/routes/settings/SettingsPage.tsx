import { NutritionFacts } from "@/shared/models/NutritionFacts";
import { FaSave } from "react-icons/fa";
import { clsx } from "clsx";
import { useMutation } from "react-query";
import settingsService from "@/services/settings-service";
import { useAuth } from "@/contexts/Auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSettings } from "@/hooks/use-settings";

function SettingsPage() {
  const { user } = useAuth();
  const { data, isLoading: queryLoading } = useSettings(user?.id!);
  const { register, handleSubmit } = useForm<NutritionFacts>({
    values: data,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const saveSettings = useMutation({
    mutationFn: (values: NutritionFacts) =>
      settingsService.saveSettings(user?.id!, values),
    onSuccess: () => {
      toast.success("Settings saved");
    },
    onError: (err) => {
      toast.error(`Saving is failed: ${err}`);
    },
  });

  const onSubmit: SubmitHandler<NutritionFacts> = async (data) => {
    saveSettings.mutate(data);
  };

  const loading = queryLoading || saveSettings.isLoading;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx({ loading: loading })}
    >
      <div className="box">
        <div className="is-size-4 mb-4">My Daily Goals</div>
        <div className="field is-grouped">
          <div className="field mr-3">
            <label className="label">Proteins</label>
            <div className="control">
              <input
                {...register("proteins")}
                className="input"
                type="number"
                placeholder="per 100g."
              />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Fats</label>
            <div className="control">
              <input
                {...register("fats")}
                className="input"
                type="number"
                placeholder="per 100g."
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Carbs</label>
            <div className="control">
              <input
                {...register("carbs")}
                className="input"
                type="number"
                placeholder="per 100g."
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">KCal</label>
          <div className="control">
            <input
              {...register("calories")}
              className="input"
              type="number"
              placeholder="per 100g."
            />
          </div>
        </div>

        <div className="field mt-5">
          <p className="control is-clearfix">
            <button
              className={clsx("button is-primary is-pulled-right", {
                "is-loading": loading,
              })}
              type="submit"
            >
              <span className="icon">
                <FaSave />
              </span>
              <span>Save</span>
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}

export default SettingsPage;
