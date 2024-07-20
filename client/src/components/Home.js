// @ts-nocheck
import React, { useState } from "react";
import AddArticle from "./Pages/AddArticle";
import Articles from "./Pages/Articles";
import Header from "../frontend/Header";
import Paginate from "./Paginate";
import Login from "./Pages/Login";
import useToken from "./useToken";
import PublicArticles from "../frontend/PublicArticles";

function Home() {
  let [currentPage, setCurrentPage] = useState("0");
  let [isPublished, setIsPublished] = useState();
  const { token, setToken } = useToken();
  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <>
      <Header />
      Public
      <PublicArticles currentPage={currentPage} />
    </>
  );
}

export default Home;
