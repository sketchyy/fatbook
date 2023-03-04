import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PageTitle({ title, subtitle, backPath, children }) {
  const navigate = useNavigate();

  return (
    <div className="block columns is-mobile is-vcentered">
      {backPath && (
        <div className="column is-narrow">
          <button className="button is-text" onClick={() => navigate(backPath)}>
            <span className="icon">
              <FaChevronLeft />
            </span>
          </button>
        </div>
      )}
      <div className="column">
        <p className="title is-size-5">{title}</p>
        <p className="subtitle is-size-6">{subtitle}</p>
      </div>
      <div className="column is-narrow">{children}</div>
    </div>

    // <div className="block is-flex is-align-items-center">
    //   <div className=" is-flex-grow-1">
    //     <p className="title is-size-5">{title}</p>
    //     <p className="subtitle is-size-6">{subtitle}</p>
    //   </div>
    //   {children}
    // </div>
  );
}

export default PageTitle;
