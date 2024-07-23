//@ts-nocheck
import React from "react";
import { useFetchCategories } from "../components/hooks/useFetchArticles";
function Categories() {
  const { data: categories } = useFetchCategories();
  return (
    <>
      <div className="bg-gray-100 dark:bg-neutral-700 w-full dark:text-gray-200">
        <div className="border-t-8 border-red-600 w-2/12"></div>
        <h1 className="text-2xl">Categories</h1>
        <div className="border-red-600 border-b-8 w-2/12"></div>
      </div>

      {/* Categories from Server */}
      <div className="relative container gap-1 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto mt-2 cursor-pointer ms-1">
        {categories?.map((category, index) => {
          return (
            <a key={index} href={`/category?category=${category.name}`}>
              <div className="individualCategory relative w-[99%] group">
                <img
                  alt="category desc"
                  src={category.imgUrl}
                  className="block opacity-100 group-hover:opacity-80 w-80 h-52"
                />
                <div className="top-[45%] left-[35%] absolute opacity-80 group-hover:opacity-100">
                  <div className="bg-purple-600 p-2 text-sm text-white">
                    {category.name}
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}

export default Categories;
