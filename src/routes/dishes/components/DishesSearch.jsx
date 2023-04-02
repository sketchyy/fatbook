import React from "react";
import { FaSearch } from "react-icons/fa";

function DishesSearch(props) {
  return (
    <div className="control has-icons-left has-icons-right search-field">
      <input type="text" placeholder="Search..." className="input" />
      <span className="icon is-medium is-left">
        <FaSearch />
      </span>
      <span className="icon is-medium is-right"></span>
    </div>
  );
}

export default DishesSearch;
