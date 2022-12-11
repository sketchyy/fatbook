import React from "react";
import { FaSearch } from "react-icons/fa";

function DishesSearch(props) {
  return (
    <div className="card column is-8 is-offset-2 mt-2">
      <div className="card-content">
        <div className="content content is-flex is-align-items-center">
          <div className="control has-icons-left has-icons-right search-field is-flex-grow-1 mr-4">
            <input type="text" placeholder="Search..." className="input" />
            <span className="icon is-medium is-left">
              <FaSearch />
            </span>
            <span className="icon is-medium is-right"></span>
          </div>
          <button className="button is-success">New</button>
        </div>
      </div>
    </div>
  );
}

export default DishesSearch;
