import React from "react";
import Header from "../Header";
import { useSingleArticle } from "../hooks/useFetchArticles";
function Article() {
  const { data: article, isLoading, isError, error } = useSingleArticle();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data.</div>;
  }

  return (
    <>
      <Header />
      <div>
        <p>{article.title}</p>{" "}
      </div>
    </>
  );
}

export default Article;
