// @ts-nocheck
import React, { useState } from "react";
import useDebounce from "../../frontend/useDebounce";
import { Toaster } from "../ui/toaster";
import CheckPublished from "../CheckPublished";
import CheckHighlighted from "../CheckHighlited";
import { useNavigate } from "react-router-dom";
import {
  useFetchArticles,
  useFetchSearchAllArticles,
  useMutateArticle,
  useDeleteArticle,
} from "../hooks/useFetchArticles";
import { useQueryClient } from "@tanstack/react-query";
import Paginate from "../Paginate";
import Buttons, { PublishBtn } from "../Buttons";

function Articles() {
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState();
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const { data: searchR } = useFetchSearchAllArticles(debouncedSearch);

  let handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const { mutate } = useMutateArticle();
  const { mutate: remove } = useDeleteArticle();
  let fetchTerm = "all";
  const { data: articles } = useFetchArticles(currentPage, fetchTerm);
  const navigate = useNavigate();
  return (
    <>
      <Paginate
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        articles={articles}
      />
      <div className="flex mb-2   rounded-full w-3/5 mx-auto text-purple-700 dark:text-purple-300 group hover:ring ring-purple-300">
        <input
          type="search"
          id="search__input"
          onChange={handleSearch}
          className=" border-purple-600 bg-white dark:bg-neutral-900 focus:ring-opacity-70 p-1 border border-opacity-30 rounded-full w-full focus:outline-none focus:ring focus:ring-purple-600"
          placeholder="Start typing to search..."
        />
      </div>
      <div className="bg-purple-200 flex flex-col">
        {searchTerm?.length >= 3 && searchR ? (
          <div className="flex flex-col ">
            <p
              key={Math.random()}
              className=" bg-purple-200 container mx-auto dark:text-gray-300 p-2"
            >
              Searching For
              <span className="ml-2 text-purple-600 dark:text-purple-100 font-bold text-xl">
                {searchTerm}
              </span>{" "}
            </p>
            <p
              key={Math.random()}
              className=" bg-purple-200 container mx-auto dark:text-gray-300 p-2"
            >
              <span className="text-purple-600 dark:text-purple-100 font-bold">
                {searchR?.length}
              </span>{" "}
              Result(s) Found
            </p>
          </div>
        ) : (
          ""
        )}
        {searchTerm?.length >= 3 &&
          searchR &&
          searchR?.map((article) => {
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
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["articles"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["searched articles"],
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
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["articles"],
                    });
                    queryClient.invalidateQueries({
                      queryKey: ["searched articles"],
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
                      alt="article"
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
                  alt="article"
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
                  {new Date(article.createdAt).toLocaleDateString(undefined, {
                    day: "numeric",
                    year: "numeric",
                    month: "long",
                  })}
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
    </>
  );
}

export default Articles;
