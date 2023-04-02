import React from "react";
import { NavLink, useLocation, useResolvedPath } from "react-router-dom";

function NavLinkTab({ to, children, ...props }) {
  let path = useResolvedPath(to);
  let location = useLocation();

  let isActive = location.pathname === path.pathname;

  return (
    <li className={isActive ? "is-active" : ""}>
      <NavLink to={to} {...props}>
        {children}
      </NavLink>
    </li>
  );
}

export default NavLinkTab;
