// @ts-nocheck
import React, { useState } from "react";
import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";
import PublicArticles from "./PublicArticles";
import HighlitedSection from "./HighlitedSection";
import Reklama from "./Reklama";

function Home() {
  let [currentPage] = useState("0");

  return (
    <div className="container mx-auto">
      <Header />
      <HighlitedSection />
      <Reklama />
      <PublicArticles currentPage={currentPage} />
      <Categories />
      <Footer />
    </div>
  );
}

export default Home;
