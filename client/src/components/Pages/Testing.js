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
import { useMutation } from "@tanstack/react-query";
import Paginate from "../Paginate";
import Buttons from "../Buttons";
function Testing() {
  const [currentPage, setCurrentPage] = useState(0);
  const { mutate } = useMutateArticle();
  const { mutate: remove } = useDeleteArticle();
  const { data: articles, isLoading, isError } = useFetchArticles(currentPage);
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
          navigate(`../article?id=${article._id}`);
        };
        let handleEdit = () => {
          navigate(`../edit?id=${article._id}`);
        };
        let handlePublish = () => {
          let articleId = article._id;
          mutate({
            articleId,
            isPublished: !article.isPublished,
          });
        };
        let handleHighlighted = () => {
          let articleId = article._id;
          mutate({
            articleId,
            isHighlighted: !article.isHighlighted,
          });
        };
        let handleDelete = () => {
          let articleId = article._id;
          remove(articleId);
        };
        return (
          <div
            className="flex container justify-between mx-auto  border my-1 "
            key={article._id}
          >
            <Toaster />
            <div className="flex w-full p-2 justify-between">
              <img className=" my-2 p-2 w-48 h-48" src={article.imgUrl} />
              <div className="w-full">
                <h1
                  onClick={handleViewArticle}
                  className="font-bold mx-4 my-2 line-clamp-2 text-purple-400"
                >
                  {article.title}
                </h1>
                <p className="text-sm mx-4 text-slate-400 line-clamp-4 ">
                  {article.description}
                </p>
              </div>
            </div>
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
        );
      })}
    </>
  );
}

export default Testing;
