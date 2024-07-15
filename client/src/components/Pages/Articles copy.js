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

function Articles() {
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
          navigate(`./article?id=${article._id}`);
        };
        let handleEdit = () => {
          navigate(`./edit?id=${article._id}`);
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
            {/* Actions */}
            <section className="flex flex-col gap-1 align-top justify-items-end">
              {/* Publish Article Button */}
              <Alert
                handleFunction={handlePublish}
                alertTriggerButton={
                  <div>
                    <CheckPublished
                      isPublished={
                        article.isPublished === true ? "Published" : "Archived"
                      }
                      className={
                        article.isPublished === true
                          ? "border w-32 h-9 mt-2 px-2 bg-green-400 hover:bg-green-500 flex justify-center gap-2"
                          : "border w-32 h-9 mt-2 px-2 bg-red-400 hover:bg-red-500 flex justify-center gap-2"
                      }
                    />
                  </div>
                }
                alertTitle="Jeni i sigurt?"
                alertMessage={
                  article.isPublished === true
                    ? "Deshiron ta arkivosh artikullin?"
                    : "Deshiron ta Publikosh artikullin?"
                }
              />
              {/* Featured Article Button */}
              <Alert
                handleFunction={handleHighlighted}
                alertTriggerButton={
                  <div>
                    <CheckHighlighted
                      isHighlighted={
                        article.isHighlighted === true ? "Featured" : "Feature"
                      }
                      className={
                        article.isHighlighted === true
                          ? "border w-32 h-9 mt-2 px-2 bg-green-400 hover:bg-green-500 flex justify-center gap-2"
                          : "border w-32 h-9 mt-2 px-2 bg-amber-400 hover:bg-amber-500 flex justify-center gap-2"
                      }
                    />
                  </div>
                }
                alertTitle="Jeni i sigurt?"
                alertMessage={
                  article.isHighlighted === true
                    ? "Deshiron ta heqesh artikullin nga Highlighted?"
                    : "Deshiron ta besh artikullin Highlighted?"
                }
              />

              <button
                onClick={handleEdit}
                className="border w-32 h-9 flex bg-yellow-200 hover:bg-yellow-500 gap-2 justify-center "
              >
                <p className="py-1 ms-2 flex">Edit</p>
                <FaPencilAlt className="m-2 " />
              </button>

              {/* Delete Button */}
              <Alert
                handleFunction={handleDelete}
                alertTriggerButton={
                  <div className="w-32 cursor-pointer hover:text-slate-100 text-white border h-9  flex bg-red-500 hover:bg-red-600 gap-2 justify-center ">
                    <p className="py-1 ms-2 flex ">Delete</p>
                    <FaTrash className="mt-2 me-2" />
                  </div>
                }
                alertTitle="Jeni i sigurt?"
                alertMessage="Jeni duke fshire artikullin nga serveri. Jeni te sigurt per kete veprim?"
              />
            </section>
          </div>
        );
      })}
    </>
  );
}

export default Articles;
