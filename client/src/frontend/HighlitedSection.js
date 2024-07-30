// @ts-nocheck
import {
  useFetchHighlightedArticles,
  useFetchHighlightedArticle,
} from "../components/hooks/useFetch";
import React, { useState } from "react";
function HighlitedSection() {
  const { data: articles, status } = useFetchHighlightedArticles();
  const { data: firstArt } = useFetchHighlightedArticle();
  let [artikull, setArtikull] = useState({});
  return (
    <div className="md:flex mx-1">
      {/* Left Side */}
      <div className="relative hover:opacity-100 my-2 ml-1 md:ml-4 xl:ml-0 md:w-2/3 hover:cursor-pointer">
        {status === "success" ? (
          <div className="opacity-95 hover:opacity-100 mr-2">
            <a
              href={`article?id=${artikull._id || (firstArt && firstArt[0]?._id)}`}
            >
              <img
                src={artikull.imgUrl || (firstArt && firstArt[0]?.imgUrl)}
                alt=""
                className="opacity-90"
              />
              <div className="relative bg-purple-800 bg-opacity-100 lg:bg-opacity-80 hover:bg-opacity-90 lg:-mt-28 py-2 w-full h-28 text-white">
                <h3 className="p-1 md:text-xl line-clamp-2 ">
                  {artikull.title || (firstArt && firstArt[0]?.title)}
                </h3>
              </div>
            </a>
          </div>
        ) : (
          <div className="opacity-95 hover:opacity-100 mr-2">
            <a href={`article?id=${artikull._id}`}>
              <img src={artikull.imgUrl} alt="" className="opacity-90" />
              <div className="relative bg-purple-800 bg-opacity-100 lg:bg-opacity-80 hover:bg-opacity-90 lg:-mt-28 py-2 w-full h-28 text-white">
                <h3 className="p-1 md:text-xl line-clamp-2 ">
                  {artikull.title}
                </h3>
              </div>
            </a>
          </div>
        )}
      </div>
      {/* Right Side */}
      <div className=" flex-row my-1 p-2 w-full md:w-1/2 lg:w-1/3 hover:cursor-pointer">
        {articles?.map((article, index) => {
          return (
            <div key={index}>
              <div
                onClick={(e) => {
                  setArtikull({
                    title: article.title,
                    imgUrl: article.imgUrl,
                    _id: article._id,
                  });
                  window.scrollTo(0, 0);
                }}
                id={index}
                className="flex mb-2 lg:mt-0 artikull bg-slate-100 dark:bg-neutral-800 opacity-85 hover:opacity-100 hover:shadow-md"
              >
                <img
                  src={article.imgUrl}
                  className="w-28 h-24 hover:cursor-default"
                  alt=""
                />
                <p
                  id={index}
                  className="p-1 dark:text-gray-300 text-sm lg:text-md"
                >
                  {article.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HighlitedSection;
