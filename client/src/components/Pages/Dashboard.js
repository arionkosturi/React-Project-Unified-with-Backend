// @ts-nocheck
import React, { useState } from "react";
import Articles from "../Pages/Articles";
import Header from "../Header";
import Login from "../Pages/Login";
import useToken from "../useToken";
import { Link } from "react-router-dom";

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
          <Link to="/dashboard/new">New</Link>
          <Link to="/dashboard/">All Articles</Link>

          <Link to="/dashboard/published">Published</Link>

          <Link to="/dashboard/categories">Categories</Link>
          <p>Settings</p>
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
