import React from "react";

function PageTitle({ title, subtitle, children }) {
  return (
    <div className="block is-flex is-align-items-center">
      <div className=" is-flex-grow-1">
        <p className="title is-size-5">{title}</p>
        <p className="subtitle is-size-6">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export default PageTitle;
