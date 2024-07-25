// @ts-nocheck
import React, { useState } from "react";
import Articles from "../Pages/Articles";
import Header from "../Header";
import Login from "../Pages/Login";
import useToken from "../useToken";
import { Link, NavLink } from "react-router-dom";

function Dashboard() {
  let [currentPage] = useState("0");
  let [isPublished, setIsPublished] = useState();
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl">
          <span className="bg-yellow-400 text-white mr-2 px-2 py-1">All</span>
          Articles
        </h1>
      </div>
      <div className="flex flex-col md:flex-row mx-2 sm:container sm:mx-auto">
        <div className="flex  flex-col mt-10 gap-2 md:max-w-40 w-full">
          <Link
            className="hover:bg-slate-100 p-2 text-center sm:text-left"
            to="/dashboard/new"
          >
            New Article
          </Link>
          <NavLink
            to="/dashboard/"
            className={({ isActive }) => {
              return isActive
                ? "bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left"
                : "bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left";
            }}
          >
            All Articles
          </NavLink>

          <Link
            to="/dashboard/published"
            className="hover:bg-slate-100 p-2 text-center sm:text-left"
          >
            Published
          </Link>

          <Link
            to="/dashboard/categories"
            className="hover:bg-slate-100 p-2 text-center sm:text-left"
          >
            Categories
          </Link>
        </div>
        <div className="max-w-full flex flex-col">
          <Articles
            isPublished={isPublished}
            setIsPublished={setIsPublished}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
