// @ts-nocheck
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { ToastAction } from "../ui/toast";
import CheckPublished from "../CheckPublished";
import CheckHighlighted from "../CheckHighlited";
import { FaTrash, FaPencilAlt, FaStar } from "react-icons/fa";
import Alert from "../Alert";
import { useNavigate } from "react-router-dom";
import {
  useFetchArticles,
  useMutateArticle,
  useDeleteArticle,
} from "../hooks/useFetchArticles";
import Header from "../Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Paginate from "../Paginate";
import Buttons, { PublishBtn } from "../Buttons";
import { Badge } from "../ui/badge";
import HTMLReactParser from "html-react-parser";
function Testing() {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);
  const { mutate, error, status, isPending } = useMutateArticle();
  const { mutate: remove } = useDeleteArticle();
  const { data: articles } = useFetchArticles(currentPage);
  const navigate = useNavigate();
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
              networkMode: "offlineFirst",
              onSuccess: async () => {
                return await queryClient.invalidateQueries({
                  queryKey: ["articles"],
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
                  queryKey: ["articles"],
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
        // console.log(contentStriped);
        return (
          <div
            className="flex container justify-between mx-auto  border my-1 "
            key={article._id}
          >
            <Toaster />
            <div className="flex w-full p-2 justify-between">
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

                <img className=" w-full my-2 p-2 h-48" src={article.imgUrl} />
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
            <div>
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
    </>
  );
}

export default Testing;
