import React, { createRef } from "react";
import { Form } from "react-router-dom";
import PageTitle from "../../../shared/PageTitle";

function SetPortionSize({ selectedIngredient, onSubmit, onCancel }) {
  const ref = createRef();

  return (
    <Form className="box" onSubmit={() => onSubmit(ref.current.value)}>
      <PageTitle
        title="Set portion size"
        subtitle={"For " + selectedIngredient.name}
      />

      <div className="field">
        <div className="control">
          <input
            ref={ref}
            name="servingSize"
            className="input"
            type="number"
            placeholder="g."
            defaultValue={selectedIngredient.defaultServingSize}
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
