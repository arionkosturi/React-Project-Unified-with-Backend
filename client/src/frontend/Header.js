// @ts-nocheck
import React, { useState } from "react";
import {
  FaBars,
  FaRegNewspaper,
  FaUser,
  FaBookmark,
  FaHeart,
} from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import useDebounce from "./useDebounce";
import {
  useFetchSearchedArticles,
  useSingleUser,
} from "../components/hooks/useFetch";

export default function Header({ className }) {
  const [searchTerm, setSearchTerm] = useState();
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const { data: searchR } = useFetchSearchedArticles(debouncedSearch);
  const { data: loggedUser } = useSingleUser();
  const navigate = useNavigate();

  let handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
  };

  let handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <div>
      <div className="flex container mx-auto justify-between items-center py-2">
        <div className="flex justify-between container mx-auto items-center px-2">
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
              className=" border-purple-600 bg-white  focus:ring-opacity-70 p-1 border border-opacity-30 rounded-full w-full focus:outline-none focus:ring focus:ring-purple-600"
              placeholder="Start typing to search..."
            />
          </div>

          <label htmlFor="menu-toggler">
            <FaBars className="xl:hidden my-2 dark:text-gray-300" />
          </label>
          <input type="checkbox" id="menu-toggler" className="hidden peer" />

          <nav className="z-10 container mx-auto peer-checked:block  xl:relative top-16 xl:top-0 absolute xl:flex justify-start lg:items-center hidden bg-white  shadow-md lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
            <div className="flex xl:flex-row flex-col shadow-md xl:shadow-none mx-2 px-2 text-left text-purple-700">
              <div className=" xl:relative top-16 xl:top-0 flex flex-col md:flex-row justify-start md:items-left bg-white lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
                <div className="xl:relative top-16 xl:top-0 flex flex-col lg:flex-row justify-start md:items-left bg-white   lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
                  <div className="px-3 xl:relative top-16 xl:top-0 flex flex-col lg:flex-row justify-start md:items-left bg-white lg:shadow-none py-2 w-full">
                    {!loggedUser?.guest && loggedUser ? (
                      <div className="z-10">
                        <NavigationMenu className="">
                          <NavigationMenuList>
                            <NavigationMenuItem>
                              <NavigationMenuTrigger>
                                <p className="flex text-purple-500 mr-2">
                                  Pershendetje, {loggedUser.username}
                                </p>
                              </NavigationMenuTrigger>
                              <NavigationMenuContent>
                                <NavigationMenuLink>
                                  {" "}
                                  <Button
                                    onClick={() => {
                                      navigate("/profile");
                                    }}
                                    className="flex w-[300px] md:w-[200px] bg-white hover:bg-slate-100"
                                  >
                                    <FaUser className="text-purple-500 mr-2" />
                                    <span className="text-purple-600">
                                      {" "}
                                      Your Profile
                                    </span>
                                  </Button>
                                </NavigationMenuLink>
                                <NavigationMenuLink>
                                  {" "}
                                  <Button
                                    onClick={() => {
                                      navigate("/liked");
                                    }}
                                    className="flex w-full bg-white hover:bg-slate-100"
                                  >
                                    <FaHeart className="text-purple-500 mr-2" />
                                    <span className="text-purple-600">
                                      {" "}
                                      Liked Articles
                                    </span>
                                  </Button>
                                </NavigationMenuLink>
                                <NavigationMenuLink>
                                  {" "}
                                  <Button
                                    onClick={() => {
                                      navigate("/saved");
                                    }}
                                    className="flex w-full bg-white hover:bg-slate-100"
                                  >
                                    <FaBookmark className="text-purple-500 mr-2" />
                                    <span className="text-purple-600">
                                      {" "}
                                      Saved Articles
                                    </span>
                                  </Button>
                                </NavigationMenuLink>
                              </NavigationMenuContent>
                            </NavigationMenuItem>
                          </NavigationMenuList>
                        </NavigationMenu>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  {loggedUser?.isAdmin && (
                    <Button
                      onClick={() => {
                        navigate("/dashboard/all");
                      }}
                      className="flex bg-purple-600 hover:bg-purple-500 mx-2 shadow border py-1 px-2 my-2"
                    >
                      Dashboard
                    </Button>
                  )}

                  {loggedUser?.guest ? (
                    <Button
                      className="flex bg-purple-600 hover:bg-purple-500 m-2 shadow border py-1 px-2"
                      onClick={() => {
                        navigate("/userlogin");
                      }}
                    >
                      Log in
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="flex bg-purple-600 hover:bg-purple-500 mx-2 shadow border px-2 my-2"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div className="bg-purple-200 flex flex-col container mx-auto">
        {searchTerm?.length >= 3 && searchR ? (
          <div className="flex flex-col ">
            <p className=" bg-purple-200 container mx-auto dark:text-gray-300 p-2">
              Searching For
              <span className="ml-2 text-purple-600 dark:text-purple-100 font-bold text-xl">
                {searchTerm}
              </span>{" "}
            </p>
            <p className=" bg-purple-200 container mx-auto dark:text-gray-300 p-2">
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
              <article
                key={result._id}
                className="flex w-[95%] ml-4 bg-white shadow-xl hover:shadow-xl my-3"
              >
                <div className="flex flex-row w-1/3">
                  <a href={`/article/?id=${result._id}`} className="flex">
                    {result.imgUrl ? (
                      <img
                        className="w-96 p-2 h-50 my-2"
                        alt="article"
                        src={result.imgUrl}
                      />
                    ) : (
                      <img
                        className="w-full p-2 h-48 my-2"
                        alt="article"
                        src={
                          "data:image/png;base64,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"
                        }
                      />
                    )}
                  </a>
                </div>
                <div className="flex flex-col justify-between dark:bg-neutral-900 w-2/3">
                  <a href={`/article/?id=${result._id}`} className="flex">
                    <div className="border-gray-900/10 border-s p-2 sm:p-4 sm:border-l-transparent">
                      <h3 className="line-clamp-2 sm:line-clamp-3 font-bold text-gray-900 dark:text-white uppercase">
                        {result.title}
                      </h3>
                      <p className="line-clamp-4 dark:text-gray-100">
                        {" "}
                        {result.description}
                      </p>
                    </div>
                  </a>

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
            );
          })}
      </div>
    </div>
  );
}
