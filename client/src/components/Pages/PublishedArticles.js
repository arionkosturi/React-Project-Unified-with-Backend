// @ts-nocheck
import React, { useState } from "react";
import { Toaster } from "../ui/toaster";
import CheckPublished from "../CheckPublished";
import CheckHighlighted from "../CheckHighlited";
import { useNavigate } from "react-router-dom";
import {
  useFetchArticles,
  useSingleUser,
  useMutateArticle,
  useDeleteArticle,
} from "../hooks/useFetch";
import Header from "../Header";
import { useQueryClient } from "@tanstack/react-query";
import Paginate from "../Paginate";
import Buttons, { PublishBtn } from "../Buttons";
import Login from "../../frontend/UserLogin";
import LeftPanel from "./LeftPanel";

function PublishedArticles() {
  const queryClient = useQueryClient();
  const { data: loggedUser } = useSingleUser();
  const [currentPage, setCurrentPage] = useState(0);
  const { mutate } = useMutateArticle();
  const { mutate: remove } = useDeleteArticle();
  const { data } = useFetchArticles(currentPage);
  const navigate = useNavigate();

  if (!loggedUser?.isAdmin) {
    return <Login />;
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
        <LeftPanel />
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

                    {article.imgUrl ? (
                      <img
                        className="w-full p-2 h-48"
                        alt="article"
                        src={article.imgUrl}
                      />
                    ) : (
                      <img
                        className="w-full p-3 h-48"
                        alt="article"
                        src={
                          "data:image/png;base64,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"
                        }
                      />
                    )}
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
