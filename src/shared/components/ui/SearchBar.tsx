import { useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { Form } from "react-router-dom";

function SearchBar({ defaultValue, onChange }) {
  const timeout = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(defaultValue ?? "");

  const handleChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value.length > 2 || event.target.value.length === 0) {
      //Clear the previous timeout.
      clearTimeout(timeout.current);

      timeout.current = setTimeout(() => {
        onChange(event);
      }, 400);
    }
  };

  const handleClearClick = (event) => {
    setQuery("");
    onChange(event);
    inputRef.current?.focus();
  };

  return (
    <div
      id="search-form"
      role="search"
      className="content content is-flex is-align-items-center"
    >
      <Form
        className="control has-icons-left has-icons-right search-field is-flex-grow-1"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          id="q"
          name="q"
          value={query}
          type="search"
          placeholder="Search dish"
          className="input"
          onChange={handleChange}
        />
        <span className="icon is-medium is-left">
          <FaSearch />
        </span>
        {query && (
          <span
            className="icon is-medium is-right is-clickable"
            onClick={handleClearClick}
          >
            <FaTimes />
          </span>
        )}
      </Form>
    </div>
  );
}

export default SearchBar;
