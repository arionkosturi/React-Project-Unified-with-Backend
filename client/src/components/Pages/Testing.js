// @ts-nocheck
import axios from "axios";
import React, { useState } from "react";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { ToastAction } from "../ui/toast";
import CheckPublished from "../CheckPublished";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import DeleteAlert from "../DeleteAlert";
import { useNavigate } from "react-router-dom";
import { useFetchArticles, useMutateArticle } from "../hooks/useFetchArticles";
import Header from "../Header";
import { useMutation, QueryClient } from "@tanstack/react-query";
import Paginate from "../Paginate";

const queryClient = new QueryClient();

function Testing() {
  const [currentPage, setCurrentPage] = useState(0);
  const { mutate } = useMutateArticle();
  const { data: articles, isLoading, isError } = useFetchArticles(currentPage);
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState("");
  return (
    <>
      <Header />
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        articles={articles}
        onClick={"click"}
      />
      {articles?.map((article) => {
        let handleEdit = () => {
          navigate(`../article?id=${article._id}`);
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
                  onClick={handleEdit}
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
              <CheckPublished
                handlePublish={() => {
                  let id = article._id;
                  mutate({ id, isPublished: !article.isPublished });
                  console.log(
                    `clicked ${article.title} - ${article.isPublished}`
                  );
                }}
                isPublished={
                  article.isPublished === true ? "Published" : "Archived"
                }
                className={
                  article.isPublished === true
                    ? "border w-24 h-9 mt-2 px-2 bg-green-400"
                    : "border w-24 h-9 mt-2 px-2 bg-red-400"
                }
              />
              <button
                // onClick={handleEdit}
                className="border w-24 h-9 flex bg-yellow-200 hover:bg-yellow-500 gap-2 "
              >
                <p className="py-1 ms-2 flex">Edit</p>
                <FaPencilAlt className="m-2 " />
              </button>

              {/* Delete Button */}
              <DeleteAlert
                // handleDelete={handleDelete}
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

export default Testing;
