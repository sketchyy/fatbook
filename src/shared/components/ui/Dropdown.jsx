import React, { Fragment, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import useOutsideClick from "./hooks/useOutsideClick";

function Dropdown({ menuItems, dropdownTriggerTemplate, children, className }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClick(() => setOpen(false));

  const handleTriggerClick = () => {
    setOpen(!open);
  };
  const handleOptionClick = (e, option) => {
    e.preventDefault();
    option.command();
    setOpen(false);
  };
  const isActiveClassName = open ? " is-active" : "";

  return (
    <div ref={ref} className={"dropdown" + isActiveClassName + " " + className}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleTriggerClick}
        >
          {dropdownTriggerTemplate && dropdownTriggerTemplate()}
          {!dropdownTriggerTemplate && (
            <Fragment>
              <span>{children}</span>
              <span className="icon is-small">
                <FaChevronDown />
              </span>
            </Fragment>
          )}
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {menuItems.map((option, index) => (
            <div
              key={index}
              className="dropdown-item is-flex is-align-items-center"
              onClick={(e) => handleOptionClick(e, option)}
            >
              <span className="icon is-small mr-3">{option.icon}</span>
              <span>{option.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
