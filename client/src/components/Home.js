// @ts-nocheck
import React, { useState } from "react";
import AddArticle from "./Pages/AddArticle";
import Articles from "./Pages/Articles";
import Header from "../frontend/Header";
import Paginate from "./Paginate";
import Login from "./Pages/Login";
import useToken from "./useToken";
import Categories from "../frontend/Categories";
import Footer from "../frontend/Footer";
import PublicArticles from "../frontend/PublicArticles";
import HighlitedSection from "../frontend/HighlitedSection";
function Home() {
  let [currentPage, setCurrentPage] = useState("0");
  let [isPublished, setIsPublished] = useState();
  const { token, setToken } = useToken();

  return (
    <div className="container mx-auto">
      <Header />
      <HighlitedSection />
      <PublicArticles currentPage={currentPage} />
      <Categories />
      <Footer />
    </div>
  );
}

export default Home;
