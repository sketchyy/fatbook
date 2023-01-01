import React from "react";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-router-dom";

// TODO: Search starts from 3 symbols, debounce (lodash?)
function SearchBar({ defaultValue, onChange }) {
  return (
    <div
      id="search-form"
      role="search"
      className="content content is-flex is-align-items-center"
    >
      <Form className="control has-icons-left search-field is-flex-grow-1">
        <input
          id="q"
          name="q"
          defaultValue={defaultValue}
          type="search"
          placeholder="Search dish"
          className="input"
          onChange={onChange}
        />
        <span className="icon is-medium is-left">
          <FaSearch />
        </span>
      </Form>
    </div>
  );
}

export default SearchBar;
