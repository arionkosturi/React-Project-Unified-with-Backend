import React from "react";
import Header from "./Header";
function PublicCategory() {
  return (
    <>
      <Header />
      <div className="mt-6 text-4xl font-bold p-2 text-purple-700">
        categoryName.category
        <article className="flex mr-4 bg-white shadow-xl hover:shadow-xl my-3">
          <div className="flex flex-row w-1/2">
            <img alt="" src={"data.imgUrl"} className="w-full h-34 p-1" />
          </div>

          <div className="flex flex-col justify-between dark:bg-neutral-900 w-1/2">
            <div className="border-gray-900/10 border-s p-2 sm:p-4 sm:border-l-transparent">
              <a href="#">
                <h3 className="line-clamp-2 sm:line-clamp-3 font-bold text-gray-900 dark:text-white uppercase">
                  {"data.title"}
                </h3>
              </a>

              <p className="line-clamp-4 mt-6 dark:text-gray-100">
                {" "}
                {"data.description"}
              </p>
            </div>

            <div className="sm:flex sm:justify-end sm:items-end">
              <a
                href="article.html?id=${data._id}"
                className="block bg-purple-500 hover:bg-purple-400 mx-2 px-5 py-3 font-bold text-center text-gray-100 text-xs uppercase transition"
              >
                Lexo me shume
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}

export default PublicCategory;
