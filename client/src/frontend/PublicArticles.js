// @ts-nocheck
import axios from "axios";
import React, { useState } from "react";
import { FaTrash, FaPencilAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFetchPublishedArticles } from "../components/hooks/useFetchArticles";
// import Header from "../Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Paginate from "./Paginate";
import { Badge } from "../components/ui/badge";
import HTMLReactParser from "html-react-parser";
function PublicArticles() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const { data: articles } = useFetchPublishedArticles(currentPage);
  const navigate = useNavigate();
  console.log(currentPage);
  return (
    <>
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        articles={articles}
      />

      {articles?.map((article) => {
        let handleViewArticle = () => {
          navigate(`../dashboard/article?id=${article._id}`);
        };

        let contentStriped = article.content.replace(/<[^>]*>/g, "");
        // console.log(contentStriped);
        return (
          <div
            className="flex flex-col xl:flex-row container justify-between mx-auto  border border-purple-400 my-1 "
            key={article._id}
          >
            <div className="flex flex-col md:flex-row p-2 justify-between">
              <div
                onClick={handleViewArticle}
                className="relative cursor-pointer overflow-hidden w-96 h-48 bg-white border"
              >
                <img className=" my-2 p-2 h-48" src={article.imgUrl} />
              </div>

              <div className="w-full flex flex-col justify-between">
                <h1
                  onClick={handleViewArticle}
                  className="cursor-pointer font-bold mx-4 my-2 line-clamp-2 text-purple-400"
                >
                  {article.title}
                </h1>
                <p className="text-sm mx-4 my-2 text-slate-400 line-clamp-2 ">
                  {article.description}
                </p>
                <div className="text-sm mx-4 my-2 text-slate-400 line-clamp-4 ">
                  {contentStriped}
                </div>

                <p className="flex justify-end text-sm mx-4 text-slate-400 ">
                  {new Date(article.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex xl:flex-col"></div>
          </div>
        );
      })}
    </>
  );
}

export default PublicArticles;
