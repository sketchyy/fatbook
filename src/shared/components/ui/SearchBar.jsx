import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-router-dom";

function SearchBar({ defaultValue, onChange }) {
  const timeout = useRef();

  const handleChange = (event) => {
    if (event.target.value.length > 2 || event.target.value.length === 0) {
      //Clear the previous timeout.
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        onChange(event);
      }, 400);
    }
  };

  return (
    <div
      id="search-form"
      role="search"
      className="content content is-flex is-align-items-center"
    >
      <Form
        className="control has-icons-left search-field is-flex-grow-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          id="q"
          name="q"
          defaultValue={defaultValue}
          type="search"
          placeholder="Search dish"
          className="input"
          onChange={handleChange}
        />
        <span className="icon is-medium is-left">
          <FaSearch />
        </span>
      </Form>
    </div>
  );
}

export default SearchBar;
