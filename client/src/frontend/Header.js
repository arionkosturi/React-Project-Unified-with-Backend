// @ts-nocheck
import React, { useState, useEffect } from "react";
import { FaBars, FaRegNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import useToken from "../components/useToken";
import useDebounce from "./useDebounce";
import { useFetchSearchedArticles } from "../components/hooks/useFetchArticles";
export default function Header() {
  const [searchTerm, setSearchTerm] = useState();
  const { token } = useToken();
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const { data: searchR } = useFetchSearchedArticles(debouncedSearch);
  const navigate = useNavigate();

  useEffect(() => {
    let searchInput = document.querySelector("#search__input");
    document.addEventListener("keydown", (e) => {
      searchInput.focus();
    });
    return () => {
      document.removeEventListener("keydown", () => {});
    };
  }, []);

  let handleLogin = () => {
    navigate("/dashboard");
  };

  let handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
  };
  // let handleSubmit = (e) => {
  //   e.preventDefault();
  //   setSearchTerm(e.target.value);
  // };
  let handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div className="flex container mx-auto justify-between items-center py-2">
        <div className="flex justify-between container mx-auto items-center py-1">
          <div className=" font-semi  text-purple-700 text-xl ">
            <a href="/">
              <span className="text-4xl">
                <FaRegNewspaper />
              </span>
              <p>News</p>
            </a>
          </div>
          <div className="flex -space-x-16 mx-10 xl:ml-40 rounded-full w-3/5 xl:w-full text-purple-700 dark:text-purple-300 group hover:ring ring-purple-300">
            <input
              type="search"
              id="search__input"
              onChange={handleSearch}
              className=" border-purple-600 bg-white dark:bg-neutral-900 focus:ring-opacity-70 p-1 border border-opacity-30 rounded-full w-full focus:outline-none focus:ring focus:ring-purple-600"
              placeholder="Start typing to search..."
            />
          </div>

          <label htmlFor="menu-toggler">
            <FaBars className="xl:hidden my-2 dark:text-gray-300" />
          </label>
          <input type="checkbox" id="menu-toggler" className="hidden peer" />

          <nav className="peer-checked:block  z-30 xl:relative top-16 xl:top-0 absolute xl:flex justify-end lg:items-center hidden bg-white dark:bg-neutral-800 shadow-md lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
            <div className="flex xl:flex-row flex-col shadow-md xl:shadow-none mx-4 px-2 text-left text-purple-700">
              <div className=" xl:relative top-16 xl:top-0 flex flex-col lg:flex-row justify-start md:items-center bg-white   lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
                {!token ? (
                  <Button
                    className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                ) : (
                  <>
                    <p
                      onClick={() => {
                        navigate("/dashboard");
                      }}
                      className="mx-2 cursor-pointer border py-2 px-3 hover:bg-slate-100"
                    >
                      Dashboard
                    </p>
                    <Button
                      className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                )}

                <a
                  className="hover:bg-purple-600 sm:px-2 text-md hover:text-white transition-all duration-300 ease-in-out"
                  href="category.html?category=News"
                >
                  News
                </a>
                <a
                  className="hover:bg-purple-600 sm:px-2 text-md hover:text-white transition-all duration-300 ease-in-out"
                  href="category.html?category=Finance"
                >
                  Finance
                </a>
                <a
                  className="hover:bg-purple-600 sm:px-2 text-md hover:text-white transition-all duration-300 ease-in-out"
                  href="category.html?category=Sports"
                >
                  Sports
                </a>
                <div className="inline-block relative hover:bg-purple-600 text-left hover:text-white group">
                  <button
                    type="button"
                    className="inline-flex justify-left items-center hover:bg-purple-600 sm:px-2 w-full text-md hover:text-white transition-all duration-300 ease-in-out"
                  >
                    More
                    <svg
                      className="ml-1 w-4 h-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                    </svg>
                  </button>
                  <div className="group-hover:visible top-5 left-0 absolute bg-white dark:bg-neutral-800 opacity-0 group-hover:opacity-100 shadow-lg mt-1 rounded-md w-full xl:w-auto transition duration-300 invisible">
                    <div className="py-1">
                      <a
                        href="category.html?category=News"
                        className="block hover:bg-purple-600 px-4 py-2 text-gray-700 text-sm hover:text-white dark:text-gray-200"
                      >
                        News
                      </a>
                      <a
                        href="category.html?category=Lifestyle"
                        className="block hover:bg-purple-600 px-4 py-2 text-gray-700 text-sm hover:text-white dark:text-gray-200"
                      >
                        Lifestyle
                      </a>
                      <a
                        href="category.html?category=Entertainment"
                        className="block hover:bg-purple-600 px-4 py-2 text-gray-700 text-sm hover:text-white dark:text-gray-200"
                      >
                        Entertainment
                      </a>
                      <a
                        href="category.html?category=Finance"
                        className="block hover:bg-purple-600 px-4 py-2 text-gray-700 text-sm hover:text-white dark:text-gray-200"
                      >
                        Finance
                      </a>
                      <a
                        href="category.html?category=Sports"
                        className="block hover:bg-purple-600 px-4 py-2 text-gray-700 text-sm hover:text-white dark:text-gray-200"
                      >
                        Sports
                      </a>
                      <a
                        href="category.html?category=Climate"
                        className="block hover:bg-purple-600 px-4 py-2 text-gray-700 text-sm hover:text-white dark:text-gray-200"
                      >
                        Climate Change
                      </a>
                      <a
                        href="category.html?category=Health"
                        className="block hover:bg-purple-600 px-4 py-2 text-gray-700 text-sm hover:text-white dark:text-gray-200"
                      >
                        Health
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
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
          searchR?.map((result) => {
            return (
              <>
                <article
                  key={result._id}
                  className="flex w-[95%] ml-4 bg-white shadow-xl hover:shadow-xl my-3"
                >
                  <div className="flex flex-row w-1/3">
                    <img
                      alt=""
                      src={result.imgUrl}
                      className="w-full h-34 p-1"
                    />
                  </div>
                  <div className="flex flex-col justify-between dark:bg-neutral-900 w-2/3">
                    <div className="border-gray-900/10 border-s p-2 sm:p-4 sm:border-l-transparent">
                      <a href={`article?id=${result._id}`} rel="noopener">
                        <h3 className="line-clamp-2 sm:line-clamp-3 font-bold text-gray-900 dark:text-white uppercase">
                          {result.title}
                        </h3>
                      </a>

                      <p className="line-clamp-4 dark:text-gray-100">
                        {" "}
                        {result.description}
                      </p>
                    </div>

                    <div className="sm:flex sm:justify-end sm:items-end">
                      <a
                        href={`/article/?id=${result._id}`}
                        className="block bg-purple-500 hover:bg-purple-400 mx-2 px-5 py-3 font-bold text-center text-gray-100 text-xs uppercase transition"
                      >
                        Lexo me shume
                      </a>
                    </div>
                  </div>
                </article>
              </>
            );
          })}
      </div>
    </>
  );
}
