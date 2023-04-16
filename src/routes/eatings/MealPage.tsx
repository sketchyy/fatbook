import { FaChevronLeft, FaPlus } from "react-icons/fa";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import eatingsService from "../../core/firebase/eatingsService";
import EditDishPortionsForm from "../../shared/components/dish-portions-form/EditDishPortionsForm";
import FoodValue from "../../shared/components/FoodValue";
import PageTitle from "../../shared/components/PageTitle";
import { meals } from "./MealCards";

function MealPage(props) {
  const navigate = useNavigate();
  const { meal } = useParams();
  const { day, logDay } = useOutletContext<any>();
  const eatings = logDay.meals[meal!].eatings;
  const foodValue = logDay.meals[meal!].totalFoodValue;

  const handleDaySave = async (portion) => {
    const logDay = await eatingsService.getOrCreateLogDay(day);

    logDay.updateEating(meal, portion);

    await eatingsService.replaceLogDay(day, logDay);
  };

  const handleAddEatingDelete = async (portion) => {
    if (!window.confirm("Are you sure you want to delete this eating?")) {
      return;
    }

    const logDay = await eatingsService.getOrCreateLogDay(day);

    logDay.deleteEating(meal, portion);

    await eatingsService.replaceLogDay(day, logDay);
  };

  return (
    <div className="box">
      <div className="columns is-mobile is-vcentered">
        <div className="column is-narrow">
          <button
            className="button is-text"
            onClick={() => navigate(`/eatings/${day}`)}
          >
            <span className="icon">
              <FaChevronLeft />
            </span>
          </button>
        </div>
        <div className="column">
          <h1 className="title is-4">{meals[meal!].title}</h1>
          <h2 className="subtitle is-6">{day}</h2>
        </div>
        <div className="column is-narrow">
          <Link to="add" className="button is-primary">
            <span className="icon">
              <FaPlus />
            </span>
            <span>Add</span>
          </Link>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <div className="">
            <FoodValue foodValue={foodValue} />
          </div>
        </div>
      </div>
      <div className="block">
        <PageTitle title="Eatings"></PageTitle>
        <EditDishPortionsForm
          dishPortions={eatings}
          onSave={handleDaySave}
          onDelete={handleAddEatingDelete}
        />
      </div>
    </div>
  );
}

export default MealPage;
