// @ts-nocheck
import React, { useState } from "react";
import Header from "../frontend/Header";
import Categories from "../frontend/Categories";
import Footer from "../frontend/Footer";
import PublicArticles from "../frontend/PublicArticles";
import HighlitedSection from "../frontend/HighlitedSection";
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
