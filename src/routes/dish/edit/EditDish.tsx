import { FaSave } from "react-icons/fa";
import { Form, useNavigate, useOutletContext } from "react-router-dom";
import Message from "../../../shared/components/Message";

function EditDish(props) {
  const navigate = useNavigate();
  const { dish } = useOutletContext<any>();

  const onCancel = () => navigate("/dishes");
  const round = (numb) => {
    if (dish.hasIngredients()) {
      return Math.round(numb);
    } else {
      return numb;
    }
  };

  const handleNameChange = ({ target }) => {
    // Update outlet context to save when navigate to ingredients
    dish.name = target.value;
  };

  return (
    <Form method="post" id="dish-form">
      <div className="box">
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              name="name"
              className="input"
              type="text"
              defaultValue={dish.name}
              onChange={handleNameChange}
            />
          </div>
        </div>

        {dish.hasIngredients() && (
          <Message title="Info">
            Food Value is calculated from ingredients
          </Message>
        )}

        <div className="field is-grouped">
          <div className="field mr-3">
            <label className="label">Proteins</label>
            <div className="control">
              <input
                name="foodValue.proteins"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={round(dish.foodValue.proteins)}
              />
            </div>
          </div>
          <div className="field mr-3">
            <label className="label">Fats</label>
            <div className="control">
              <input
                name="foodValue.fats"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={round(dish.foodValue.fats)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Carbs</label>
            <div className="control">
              <input
                name="foodValue.carbs"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={round(dish.foodValue.carbs)}
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered">
          <div className="field mr-3">
            <label className="label">KCal</label>
            <div className="control">
              <input
                name="foodValue.calories"
                className="input"
                type="number"
                step=".01"
                placeholder="per 100g."
                disabled={dish.hasIngredients()}
                defaultValue={round(dish.foodValue.calories)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Portion Size</label>
            <div className="control">
              <input
                name="defaultServingSize"
                className="input"
                type="number"
                placeholder="gramms"
                defaultValue={dish.defaultServingSize}
              />
            </div>
          </div>
        </div>

        <div className="field is-grouped is-grouped-centered is-justify-content-space-around">
          <p className="control">
            <button className="button is-light" onClick={onCancel}>
              Cancel
            </button>
          </p>
          <p className="control">
            <button className="button is-primary" type="submit">
              <span className="icon">
                <FaSave />
              </span>
              <span>Save</span>
            </button>
          </p>
        </div>
      </div>
    </Form>
  );
}

export default EditDish;
