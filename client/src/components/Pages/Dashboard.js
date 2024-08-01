// @ts-nocheck
import React, { useState } from "react";
import Articles from "../Pages/Articles";
import Header from "../Header";
import Login from "../../frontend/UserLogin";
import LeftPanel from "./LeftPanel";
import { useSingleUser } from "../hooks/useFetch";
function Dashboard() {
  let [currentPage] = useState("0");
  const { data: loggedUser } = useSingleUser();
  let [isPublished, setIsPublished] = useState();
  if (!loggedUser?.isAdmin) {
    return <Login />;
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
        <LeftPanel />
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
