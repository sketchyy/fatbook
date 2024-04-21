import { FaSave } from "react-icons/fa";
import { clsx } from "clsx";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/context/Auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSettings } from "@/hooks/use-settings";
import { FoodValue } from "@/types/food-value";
import { saveSettings } from "@/services/settings-service";
import Skeleton from "react-loading-skeleton";

function Settings() {
  const { userId } = useAuth();
  const { data, isLoading: queryLoading } = useSettings();
  const { register, handleSubmit } = useForm<FoodValue>({
    values: data,
    resetOptions: {
      keepDirtyValues: true,
    },
  });
  const saveMutation = useMutation({
    mutationFn: (values: FoodValue) => saveSettings(userId, values),
    onSuccess: () => {
      toast.success("Settings saved");
    },
    onError: (err) => {
      toast.error(`Saving is failed: ${err}`);
    },
  });

  const onSubmit: SubmitHandler<FoodValue> = async (data) => {
    saveMutation.mutate(data);
  };

  if (queryLoading) {
    return <Skeleton height={316} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx({ loading: saveMutation.isPending })}
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
                "is-loading": saveMutation.isPending,
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

export default Settings;
