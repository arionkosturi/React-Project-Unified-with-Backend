import React from "react";
import { Link, NavLink } from "react-router-dom";

function LeftPanel() {
  return (
    <div className="flex flex-col mt-10 gap-2 md:max-w-40 w-full mr-1">
      <Link
        className="hover:bg-slate-100 p-2 text-center sm:text-left"
        to="/dashboard/new"
      >
        New Article
      </Link>
      <NavLink
        to="/dashboard/all"
        className={({ isActive }) => {
          return !isActive
            ? " hover:bg-slate-100 p-2 text-center sm:text-left"
            : "bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left";
        }}
      >
        All Articles
      </NavLink>

      <NavLink
        to="/dashboard/published"
        className={({ isActive }) => {
          return !isActive
            ? " hover:bg-slate-100 p-2 text-center sm:text-left"
            : "bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left";
        }}
      >
        Published
      </NavLink>

      <NavLink
        to="/dashboard/categories"
        className={({ isActive }) => {
          return !isActive
            ? " hover:bg-slate-100 p-2 text-center sm:text-left"
            : "bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left";
        }}
      >
        Categories
      </NavLink>
      <NavLink
        to="/dashboard/users"
        className={({ isActive }) => {
          return !isActive
            ? " hover:bg-slate-100 p-2 text-center sm:text-left"
            : "bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left";
        }}
      >
        Users
      </NavLink>
    </div>
  );
}

export default LeftPanel;
