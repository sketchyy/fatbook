import React, { Fragment } from "react";
import { FaEllipsisV, FaSearch } from "react-icons/fa";

function Dishes(props) {
  return (
    <Fragment>
      <div className="">
        <div class="block card mt-2">
          <div class="card-content">
            <div class="content">
              <div class="control has-icons-left has-icons-right search-field">
                <input type="text" placeholder="" class="input is-large" />
                <span class="icon is-medium is-left">
                  <FaSearch />
                </span>
                <span class="icon is-medium is-right"></span>
              </div>
            </div>
          </div>
        </div>

        {/* dish cards ( separate component , map cycle) */}
        <div className="block column is-8 is-offset-2">
          <div className="box columns">
            <div className="column is-half-desktop is-full-mobile">
              <p className="title is-size-4	">Chicken</p>
              <p className="subtitle">120 g.</p>
            </div>
            <div className="column is-half-desktop is-full-mobile is-flex is-align-items-center">
              <div className="tabs is-flex-grow-1 mr-4 mb-0">
                <span className="tag is-rounded is-info is-medium has-text-weight-bold	">
                  10
                </span>
                <span className="tag is-rounded is-info is-medium has-text-weight-bold	">
                  12
                </span>
                <span className="tag is-rounded is-info is-medium has-text-weight-bold	">
                  13
                </span>
                <span className="tag is-rounded is-success is-medium has-text-weight-bold	">
                  200
                </span>
              </div>
              <button className="button">
                <span className="icon is-small">
                  <FaEllipsisV />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Dishes;
