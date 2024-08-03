// @ts-nocheck
import React, { useState } from "react";
import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";
import PublicArticles from "./PublicArticles";
import HighlitedSection from "./HighlitedSection";
function Home() {
  let [currentPage] = useState("0");

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
