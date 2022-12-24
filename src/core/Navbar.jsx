import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const getNavLinkClass = ({ isActive }) =>
    "navbar-item" + (isActive ? " is-active" : "");
  const dropdownActiveClassName = menuOpen ? " is-active" : "";
  const handleBurgerClick = (e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav
      className="navbar is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="/burger.png" alt="burger-icon" width="28" height="28" />
          <h1 className="is-size-4 has-text-weight-bold ml-2">Fatbook</h1>
        </a>

        <a
          role="button"
          className={"navbar-burger" + dropdownActiveClassName}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          href="/"
          onClick={handleBurgerClick}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarMenu" className={"navbar-menu" + dropdownActiveClassName}>
        <div className="navbar-start">
          <NavLink
            to={`eatings`}
            className={getNavLinkClass}
            onClick={handleLinkClick}
          >
            Eatings
          </NavLink>
          <NavLink
            to={`dishes`}
            className={getNavLinkClass}
            onClick={handleLinkClick}
          >
            Dishes
          </NavLink>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div
              // {*ngIf="auth.user | async as user"}
              className="buttons"
            >
              {/* <span className="username mr-2 mb-2">Hi, {{ user.displayName.split(" ")[0] }}!</span> */}
              {/* <a className="button" (click)="logout()"> Logout </a> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
