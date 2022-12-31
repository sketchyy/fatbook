import React, { createRef } from "react";
import { Form } from "react-router-dom";

function SetPortionSize({ dish, onSubmit, onCancel }) {
  const ref = createRef();

  return (
    <Form className="box" onSubmit={() => onSubmit(ref.current.value)}>
      <div className="field">
        <p className="title is-4">{dish.name}</p>
        <p className="subtitle is-6">{dish.foodValue?.calories} kcal</p>
      </div>
      <input name="dish" type="hidden" defaultValue={dish} />
      <div className="field">
        <label className="label">Please input portion size</label>
        <div className="control">
          <input
            ref={ref}
            name="servingSize"
            className="input"
            type="number"
            placeholder="g."
            defaultValue={dish.defaultServingSize}
          />
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
            Save
          </button>
        </p>
      </div>
    </Form>
  );
}

export default SetPortionSize;
