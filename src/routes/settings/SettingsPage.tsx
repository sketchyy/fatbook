import { ChangeEvent, FormEvent, useState } from "react";
import { FaSave } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";
import userSettingsService from "../../core/firebase/userSettingsService";
import { FoodValue } from "../../shared/models/FoodValue";
import { UserSettings } from "../../shared/models/User";

function SettingsPage(props) {
  const userSettings = useLoaderData() as UserSettings;
  const [dailyDietGoal, setDailyDietGoal] = useState<FoodValue>(
    userSettings.dailyDietGoal
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDailyDietGoal({
      ...dailyDietGoal,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    userSettingsService.save(dailyDietGoal);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="box">
        <div className="is-size-4 mb-4">My Daily Goals</div>
        <div className="field is-grouped">
          <div className="field mr-3">
            <label className="label">Proteins</label>
            <div className="control">
              <input
                name="proteins"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                value={dailyDietGoal.proteins}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Fats</label>
            <div className="control">
              <input
                name="fats"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                value={dailyDietGoal.fats}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Carbs</label>
            <div className="control">
              <input
                name="carbs"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                value={dailyDietGoal.carbs}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">KCal</label>
          <div className="control">
            <input
              name="kcal"
              className="input"
              type="number"
              step=".01"
              placeholder="per 100g."
              value={dailyDietGoal.kcal}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field mt-5">
          <p className="control is-clearfix">
            <button className="button is-primary is-pulled-right" type="submit">
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
