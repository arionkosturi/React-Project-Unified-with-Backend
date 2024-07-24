// @ts-nocheck
import React, { useState } from "react";
import { Toaster } from "../ui/toaster";
import CheckPublished from "../CheckPublished";
import CheckHighlighted from "../CheckHighlited";
import { useNavigate, Link } from "react-router-dom";
import {
  useFetchArticles,
  useMutateArticle,
  useDeleteArticle,
} from "../hooks/useFetchArticles";
import Header from "../Header";
import { useQueryClient } from "@tanstack/react-query";
import Paginate from "../Paginate";
import Buttons, { PublishBtn } from "../Buttons";
import useToken from "../useToken";
import Login from "../Pages/Login";

function PublishedArticles() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const { mutate } = useMutateArticle();
  const { mutate: remove } = useDeleteArticle();
  const { data } = useFetchArticles(currentPage);
  const navigate = useNavigate();
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <>
      {" "}
      <Header />
      <div className="container mx-auto">
        <h1 className="text-3xl">
          <span className="bg-green-500 text-white mr-2 px-2 py-1">
            Published
          </span>
          Articles
        </h1>
      </div>
      <div className="flex flex-col md:flex-row mx-2 sm:container sm:mx-auto">
        <div className="flex  flex-col mt-10 gap-2 md:max-w-40 w-full">
          <Link
            to="/dashboard/new"
            className="hover:bg-slate-100 p-2 text-center sm:text-left"
          >
            New Article
          </Link>
          <Link
            to="/dashboard/"
            className="hover:bg-slate-100 p-2 text-center sm:text-left"
          >
            All Articles
          </Link>
          <Link
            to="/dashboard/published"
            className="hover:bg-slate-100 p-2 text-center sm:text-left"
          >
            Published
          </Link>

          <Link
            to="/dashboard/categories"
            className="hover:bg-slate-100 p-2 text-center sm:text-left"
          >
            Categories
          </Link>
        </div>
        <div>
          <Paginate
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            articles={data}
          />
          {data?.map((article) => {
            let handleViewArticle = () => {
              navigate(`../dashboard/article?id=${article._id}`);
            };
            let handleEdit = () => {
              navigate(`../dashboard/edit?id=${article._id}`);
            };
            let handlePublish = () => {
              let articleId = article._id;
              mutate(
                {
                  articleId,
                  isPublished: !article.isPublished,
                },
                {
                  onSuccess: async () => {
                    return await queryClient.invalidateQueries({
                      queryKey: ["published articles"],
                    });
                  },
                }
              );
            };
            let handleHighlighted = () => {
              let articleId = article._id;
              mutate(
                {
                  articleId,
                  isHighlighted: !article.isHighlighted,
                },
                {
                  onSuccess: async () => {
                    return await queryClient.invalidateQueries({
                      queryKey: ["published articles"],
                    });
                  },
                }
              );
            };
            let handleDelete = () => {
              let articleId = article._id;
              remove(articleId);
            };
            let contentStriped = article.content.replace(/<[^>]*>/g, "");
            return (
              <div
                className="flex flex-col xl:flex-row container justify-between mx-auto  border border-purple-400 my-1 "
                key={article._id}
              >
                <Toaster />
                <div className="flex flex-col md:flex-row p-2 justify-between">
                  <div
                    onClick={handleViewArticle}
                    className="relative cursor-pointer overflow-hidden w-96 h-48 bg-white border"
                  >
                    {article.isPublished & article.isHighlighted ? (
                      <div className="absolute left-6 top-0 h-16 w-16">
                        <div className="absolute shadow-md transform -rotate-45 bg-green-400 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                          Highlighted
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <img
                      className=" my-2 p-2 h-48"
                      alt="description"
                      src={article.imgUrl}
                    />
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
                      {new Date(article.createdAt).toLocaleDateString(
                        undefined,
                        {
                          day: "numeric",
                          year: "numeric",
                          month: "long",
                        }
                      )}
                    </p>
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex xl:flex-col">
                  <PublishBtn
                    handlePublish={handlePublish}
                    article={article}
                    CheckPublished={CheckPublished}
                  />

                  <Buttons
                    article={article}
                    CheckPublished={CheckPublished}
                    handlePublish={handlePublish}
                    handleHighlighted={handleHighlighted}
                    CheckHighlighted={CheckHighlighted}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PublishedArticles;
