// @ts-nocheck
import axios from "axios";
import React from "react";
import { useFetchArticles } from "../hooks/useFetchArticles";
function Testing() {
  const { data: articles, isLoading, isError } = useFetchArticles();
  return (
    <>
      {articles?.map((article) => {
        console.log(article.isPublished);
        return (
          <div>
            <li key={article._id}>{article.title}</li>
            <p>{article.author}</p>
            <p>{article.isPublished ? "true" : "false"}</p>
          </div>
        );
      })}
    </>
  );
}

export default Testing;
