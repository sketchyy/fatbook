import React, { createRef, Fragment, useState } from "react";
import { Form, useLoaderData, useSubmit } from "react-router-dom";
import DishList from "./DishList";
import PageTitle from "./PageTitle";
import SearchBar from "./SearchBar";

function SearchDish({ title, subtitle, onSelect }) {
  const { searchResult, q } = useLoaderData();
  const submit = useSubmit();

  return (
    <Fragment>
      <div className="block">
        <div className="box">
          <PageTitle title={title} subtitle={subtitle} />

          <SearchBar
            defaultValue={q}
            onChange={(event) => {
              submit(event.currentTarget.form, { replace: true });
            }}
          />

          <DishList
            dishes={searchResult}
            onDishClick={(dish) => onSelect(dish)}
          />
        </div>
      </div>
    </Fragment>
  );
}

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
            autoFocus={true}
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

function SelectDishPortionForm({ title, subtitle, onSubmit }) {
  const [page, setPage] = useState(0);
  const [dishPortion, setDishPortion] = useState({
    dish: null,
    servingSize: 0,
  });

  const handleDishSelect = (dish) => {
    setDishPortion({ dish });
    setPage(1);
  };
  const handlePortionSizeSubmit = async (servingSize) => {
    const selectedDishPortion = {
      dish: dishPortion.dish,
      servingSize: Number(servingSize),
    };
    onSubmit(selectedDishPortion);
  };
  const handlePortionSizeCancel = () => {
    setPage(0);
  };

  const conditionalComponent = () => {
    switch (page) {
      case 0:
        return (
          <SearchDish
            title={title}
            subtitle={subtitle}
            onSelect={handleDishSelect}
          />
        );
      case 1:
        return (
          <SetPortionSize
            selectedIngredient={dishPortion.dish}
            onCancel={handlePortionSizeCancel}
            onSubmit={handlePortionSizeSubmit}
          />
        );
      default:
        return <h2>Not found</h2>;
    }
  };

  return (
    <Fragment>
      <div>{conditionalComponent()}</div>
    </Fragment>
  );
}

export default SelectDishPortionForm;
