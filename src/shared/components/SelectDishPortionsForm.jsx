import React, { Fragment, useState } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import PageTitle from "../PageTitle";
import SearchBar from "../SearchBar";
import DishPortionsList from "./dish-portions-list/DishPortionsList";

function SelectDishPortionsForm({ title, subtitle, onSubmit }) {
  const submit = useSubmit();
  const { searchResult, q } = useLoaderData();
  const [selectedPortions, setSelectedPortions] = useState([]);

  const dishPortions = searchResult.map((dish) => ({
    dish: dish,
    servingSize: null,
  }));
  const selectedIds = selectedPortions.map((p) => p.dish.id);
  const renderedPortions = [
    ...selectedPortions,
    ...dishPortions.filter((portion) => !selectedIds.includes(portion.dish.id)),
  ];

  const handleSave = () => {
    onSubmit(
      selectedPortions.map((portion) => {
        delete portion.selected;
        return portion;
      })
    );
  };

  const handleAddClick = (portion) => {
    portion.selected = true;
    const updatedSelectedPortions = [...selectedPortions, portion];

    setSelectedPortions(updatedSelectedPortions);
  };

  const handleDeleteClick = (portion) => {
    portion.selected = false;
    const updatedSelectedPortions = selectedPortions.filter(
      (p) => p.dish.id !== portion.dish.id
    );

    setSelectedPortions(updatedSelectedPortions);
  };

  return (
    <Fragment>
      <div className="block">
        <div className="box">
          <PageTitle title={title} subtitle={subtitle} backPath={-1}>
            <button className="button is-primary" onClick={handleSave}>
              <span>Save</span>
            </button>
          </PageTitle>

          <SearchBar
            defaultValue={q}
            onChange={(event) => {
              submit(event.target.form, { replace: true });
            }}
          />

          <DishPortionsList
            dishPortions={renderedPortions}
            onSubmit={handleAddClick}
            onDelete={handleDeleteClick}
            isSubmitVisible={(p) => !p.selected}
            isDeleteVisible={(p) => p.selected}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default SelectDishPortionsForm;
