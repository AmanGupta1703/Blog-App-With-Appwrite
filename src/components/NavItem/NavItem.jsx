import React from "react";

import { NavLink } from "react-router-dom";

function NavItem({ children, to, type = "link" }) {
  if (type === "button") {
    return (
      <li className="text-slate-700 cursor-pointer hover:text-slate-50 duration-200 ease-in-out font-medium hover:bg-slate-300 p-2 rounded-md">
        {children}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `block p-2 rounded-md ${
            isActive
              ? "bg-slate-300 text-slate-50"
              : "text-slate-700 font-medium cursor-pointer duration-200 ease-in-out  hover:text-slate-50 hover:bg-slate-300 p-2 rounded-md"
          }`
        }
        to={to}>
        {children}
      </NavLink>
    </li>
  );
}

export default NavItem;
