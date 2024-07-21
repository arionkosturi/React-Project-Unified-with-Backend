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
  return (
    <>
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        articles={articles}
      />
      <div className="grid lg:grid-cols-2 2xl:grid-cols-3 container mx-auto">
        {articles?.map((article) => {
          let handleViewArticle = () => {
            navigate(`../dashboard/article?id=${article._id}`);
          };
          let contentStriped = article.content.replace(/<[^>]*>/g, "");
          return (
            <article
              key={article._id}
              className="flex bg-white shadow-xl hover:shadow-xl my-3"
            >
              <div className="flex flex-row w-1/2">
                <a href="article.html?id=${articles._id}">
                  <img
                    alt=""
                    src={article.imgUrl}
                    className="w-full h-34 p-1"
                  />
                </a>
              </div>

              <div className="flex flex-col justify-between dark:bg-neutral-900 w-1/2">
                <div className="border-gray-900/10 border-s p-2 sm:p-4 sm:border-l-transparent">
                  <a href="article.html?id=${articles._id}">
                    <h3 className="line-clamp-2 sm:line-clamp-3 font-bold text-gray-900 dark:text-white uppercase">
                      {article.title}
                    </h3>
                  </a>

                  <p className="line-clamp-3 mt-4 dark:text-gray-50">
                    {" "}
                    {article.description}
                  </p>
                </div>

                <div className="sm:flex sm:justify-end sm:items-end">
                  <a
                    href="article.html?id=${articles._id}"
                    className="block bg-purple-500 hover:bg-purple-400 mx-2 px-5 py-3 font-bold text-center text-gray-100 text-xs uppercase transition"
                  >
                    Lexo me shume...
                  </a>
                </div>
              </div>
            </article>

            // <div className="flex border border-purple-400  " key={article._id}>
            //   <div className="flex p-2 justify-between">
            //     <div
            //       onClick={handleViewArticle}
            //       className="relative cursor-pointer overflow-hidden w-96 h-48 bg-white border"
            //     >
            //       <img className=" my-2 p-2 h-48" src={article.imgUrl} />
            //     </div>

            //     <div className="w-full flex flex-col justify-between">
            //       <h1
            //         onClick={handleViewArticle}
            //         className="cursor-pointer font-bold mx-4 my-2 line-clamp-2 text-purple-400"
            //       >
            //         {article.title}
            //       </h1>
            //       <p className="text-sm mx-4 my-2 text-slate-400 line-clamp-2 ">
            //         {article.description}
            //       </p>
            //       <div className="text-sm mx-4 my-2 text-slate-400 line-clamp-4 ">
            //         {contentStriped}
            //       </div>

            //       <p className="flex justify-end text-sm mx-4 text-slate-400 ">
            //         {new Date(article.createdAt).toLocaleDateString(undefined, {
            //           day: "numeric",
            //           year: "numeric",
            //           month: "long",
            //         })}
            //       </p>
            //     </div>
            //   </div>
            // </div>
          );
        })}
      </div>
    </>
  );
}

export default PublicArticles;
