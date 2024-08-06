import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
function LeftPanel() {
  return (
    <>
      <label htmlFor="menu-toggler" className="absolute  right-4 top-0">
        <FaBars className="absolute md:hidden my-2 dark:text-gray-300 right-4 top-20" />
      </label>
      <input
        type="checkbox"
        id="menu-toggler"
        className="hidden peer absolute right-4 top-[90px]"
      />

      <div className="md:flex md:mt-10 pt-2 gap-2 md:max-w-40 w-full mr-1 peer-checked:block hidden">
        <div className="flex flex-col">
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
            to="/dashboard/reklama"
            className={({ isActive }) => {
              return !isActive
                ? " hover:bg-slate-100 p-2 text-center sm:text-left"
                : "bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left";
            }}
          >
            Reklama
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
      </div>
    </>
  );
}

export default LeftPanel;
