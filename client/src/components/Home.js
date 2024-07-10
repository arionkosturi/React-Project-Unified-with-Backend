// @ts-nocheck
import React, { useState } from "react";
import AddArticle from "./Pages/AddArticle";
import Articles from "./Articles";
import Header from "./Header";
import Paginate from "./Paginate";
function Home() {
  let [currentPage, setCurrentPage] = useState("0");
  let [isPublished, setIsPublished] = useState();

  return (
    <>
      <Header />
      <Paginate currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Articles
        isPublished={isPublished}
        setIsPublished={setIsPublished}
        currentPage={currentPage}
      />
    </>
  );
}

export default Home;
