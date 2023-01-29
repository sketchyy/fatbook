import React, { Fragment, useState } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import DishPortionInput from "./DishPortionInput";
import PageTitle from "./PageTitle";
import SearchBar from "./SearchBar";

function SearchDish({ title, subtitle, onSave }) {
  const [selectedPortions, setSelectedPortions] = useState([]);
  const { searchResult, q } = useLoaderData();
  const submit = useSubmit();

  const handleSave = () => {
    onSave(
      selectedPortions.map((portion) => {
        delete portion.selected;
        return portion;
      })
    );
  };

  const handleSelectionChange = (portions) => {
    setSelectedPortions(portions);
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

          <DishPortionInput
            dishes={searchResult}
            onSelectionChange={handleSelectionChange}
          />
        </div>
      </div>
    </Fragment>
  );
}

// TODO: useless component
function SelectDishPortionForm({ title, subtitle, onSubmit }) {
  const handleSave = (selectedPortions) => {
    onSubmit(selectedPortions);
  };

  return (
    <Fragment>
      <div>
        <SearchDish title={title} subtitle={subtitle} onSave={handleSave} />
      </div>
    </Fragment>
  );
}

export default SelectDishPortionForm;
