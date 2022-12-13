import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function DishesSearch(props) {
  return (
    <div className="block">
      <div className="card">
        <div className="card-content">
          <div className="content content is-flex is-align-items-center">
            <div className="control has-icons-left has-icons-right search-field is-flex-grow-1 mr-4">
              <input type="text" placeholder="Search..." className="input" />
              <span className="icon is-medium is-left">
                <FaSearch />
              </span>
              <span className="icon is-medium is-right"></span>
            </div>
            <Link to={`/dishes/new`} className="button is-success">
              New
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishesSearch;
