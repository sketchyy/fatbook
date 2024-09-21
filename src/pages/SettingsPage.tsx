import { FaSave } from "react-icons/fa";
import { clsx } from "clsx";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/Auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSettings } from "@/hooks/use-settings";
import { FoodValue } from "@/types/food-value";
import { settingsService } from "@/services/settings-service";
import About from "@/components/About";
import AppLayout from "@/components/AppLayout";
import Button from "@/components/ui/Button";
import Box from "@/components/ui/Box";

function SettingsPage() {
  const { userId } = useAuth();
  const { data, isLoading } = useSettings();
  const { register, handleSubmit } = useForm<FoodValue>({
    values: data,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const saveMutation = useMutation({
    mutationFn: (values: FoodValue) =>
      settingsService.saveSettings(userId, values),
    onSuccess: () => {
      toast.success("Settings saved");
    },
    onError: (err) => {
      toast.error(`Saving is failed: ${err}`);
    },
  });
  const inputClasses = clsx("input", { "is-skeleton": isLoading });

  const onSubmit: SubmitHandler<FoodValue> = async (data) => {
    saveMutation.mutate(data);
  };

  return (
    <div className="is-flex is-flex-direction-column is-justify-content-space-between">
      <AppLayout>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={clsx({ loading: saveMutation.isPending })}
        >
          <Box>
            <div className="is-size-4 mb-4">My Daily Goals</div>
            <div className="field is-grouped">
              <div className="field mr-3">
                <label className="label">Proteins</label>
                <div className="control">
                  <input
                    {...register("proteins")}
                    className={inputClasses}
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
                    className={inputClasses}
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
                    className={inputClasses}
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
                  className={inputClasses}
                  type="number"
                  placeholder="per 100g."
                />
              </div>
            </div>

            <div className="field mt-5">
              <p className="control is-clearfix">
                <Button
                  type="submit"
                  color="primary"
                  icon={<FaSave />}
                  loading={saveMutation.isPending}
                  className="is-pulled-right"
                >
                  Save
                </Button>
              </p>
            </div>
          </Box>
        </form>
      </AppLayout>

      <About />
    </div>
  );
}

export default SettingsPage;
