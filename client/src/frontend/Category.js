import React from "react";
import Header from "./Header";
import { useParams } from "react-router";
import { useFetchArticles } from "../components/hooks/useFetch";
function PublicCategory() {
  let { category } = useParams();
  let currentPage = 0;
  let fetchTerm = `/category/${category}`;
  const { data: articles } = useFetchArticles(currentPage, fetchTerm);
  return (
    <>
      <Header />
      <div className="container mx-auto mt-6 text-4xl font-bold p-2 text-purple-700">
        <p className="text-black">Showing articles from: </p>
        {category}
        {articles &&
          articles.map((article) => {
            return (
              <article className="flex mr-4 bg-white shadow-xl hover:shadow-xl my-3">
                <div className="flex flex-row w-1/2">
                  <img
                    alt=""
                    src={article.imgUrl}
                    className="w-full h-34 p-1"
                  />
                </div>

                <div className="flex flex-col justify-between dark:bg-neutral-900 w-1/2">
                  <div className="border-gray-900/10 border-s p-2 sm:p-4 sm:border-l-transparent">
                    <a href={`/article?id=${article._id}`}>
                      <h3 className="line-clamp-2 text-md sm:line-clamp-3 font-bold text-gray-900 dark:text-white uppercase">
                        {article.title}
                      </h3>
                    </a>

                    <p className=" text-sm line-clamp-4 mt-6 dark:text-gray-100">
                      {" "}
                      {article.description}
                    </p>
                  </div>

                  <div className="sm:flex sm:justify-end sm:items-end">
                    <a
                      href={`/article?id=${article._id}`}
                      className="block bg-purple-500 hover:bg-purple-400 mx-2 px-5 py-3 font-bold text-center text-gray-100 text-xs uppercase transition"
                    >
                      Lexo me shume
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
}

export default PublicCategory;
