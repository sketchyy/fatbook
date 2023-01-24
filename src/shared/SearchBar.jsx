import React, { createRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-router-dom";

// TODO: Search starts from 3 symbols, debounce (lodash?)
function SearchBar({ defaultValue, onSearch }) {
  const searchInput = createRef();

  useEffect(() => {
    function handleSearch(event) {
      onSearch(event);
    }

    if (searchInput && searchInput.current) {
      const element = searchInput.current;
      element.addEventListener("search", handleSearch, false);

      return function cleanup() {
        element.removeEventListener("search", handleSearch, false);
      };
    }
  }, []);

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
          ref={searchInput}
          id="q"
          name="q"
          defaultValue={defaultValue}
          type="search"
          placeholder="Search dish"
          className="input"
        />
        <span className="icon is-medium is-left">
          <FaSearch />
        </span>
      </Form>
    </div>
  );
}

export default SearchBar;
