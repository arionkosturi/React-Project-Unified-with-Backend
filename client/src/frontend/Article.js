// @ts-nocheck
import React, { useState, useMemo, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import {
  useMutateArticle,
  useSingleArticle,
  useFetchCategories,
} from "../components/hooks/useFetchArticles";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Alert from "../components/Alert";
import { Badge } from "../components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import HTMLReactParser from "html-react-parser";
import JoditEditor, { Jodit } from "jodit-react";
import CheckHighlighted from "../components/CheckHighlited";
import {
  Alert as Njoftim,
  AlertDescription,
  AlertTitle,
} from "../components/ui/alert";
import { Edit } from "lucide-react";
import { Editor } from "react-simple-wysiwyg";
import { useSessionStorage } from "@uidotdev/usehooks";

function PublicArticle() {
  const { data: categories } = useFetchCategories();
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  let height;
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      height: 500,
      autofocus: true,
    }),
    [height]
  );

  let [njoftimIsOpen, setNjoftimIsOpen] = useSessionStorage("njoftim", 1);
  const { data: article, isLoading, isError, error } = useSingleArticle();
  let articlesDate = new Date(article?.createdAt).toLocaleDateString(
    undefined,
    {
      day: "numeric",
      year: "numeric",
      month: "long",
    }
  );
  let todaysDate = new Date().toLocaleDateString(undefined, {
    day: "numeric",
    year: "numeric",
    month: "long",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data.</div>;
  }

  return (
    <>
      <Header />

      <div>
        <section className={" container mx-auto   "}>
          <div className="container mx-auto ">
            {njoftimIsOpen === 1 && articlesDate === todaysDate ? (
              <Njoftim className=" mt-2 flex justify-between p-4 " variant="">
                <FaInfoCircle className="h-4 w-4 text-xl text-white " />
                <div className="ml-2">
                  <AlertTitle className="">Info:</AlertTitle>

                  <AlertDescription>
                    <p>Kjo eshte nje ngjarje e sapondodhur. </p>
                    <p className="text-red-400 animate-pulse ">
                      Artikulli do te perditesohet minute pas minute
                    </p>
                  </AlertDescription>
                </div>

                <div
                  onClick={() => {
                    setNjoftimIsOpen(0);
                  }}
                  className="flex"
                >
                  <IoMdCloseCircle className="-m-2 hover:text-slate-300 text-xl cursor-pointer" />
                </div>
              </Njoftim>
            ) : (
              ""
            )}

            <div className="mt-2 lg:-mx-6">
              <p className="block cursor-pointer mb-4 mx-auto container text-3xl font-semibold text-gray-800 ">
                {article.title}
              </p>

              <img
                className="object-cover w-[90%] lg:mx-6 rounded-xl h-72 text-center"
                src={article.imgUrl}
                alt=""
              />
              <div className="mt-8  lg:mt-0 lg:mx-6 ">
                <a href={`/category/${article.category}`}>
                  <p className="cursor-pointer text-lg mt-2 p-2 text-purple-700 font-bold uppercase">
                    {article.category}
                  </p>
                </a>
                <p className="cursor-pointer block mt-4 text-xl font-semibold text-gray-800 ">
                  {article.description}
                </p>
                <div className="cursor-pointer block mt-4  text-gray-700 ">
                  {HTMLReactParser(`${article.content}`)}
                </div>
                <p className="my-8 text-lg text-gray-500  md:text-md content-2"></p>
                <div className="img2 w-[90%]"></div>
                <p className="my-8 text-lg text-gray-500 md:text-md content-3"></p>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  className="finline-block mt-2 text-blue-500 underline hover:text-blue-400"
                >
                  Source
                </a>{" "}
                <div className="flex items-center mt-6">
                  <img
                    className="object-cover object-center w-10 h-10 rounded-full"
                    src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                    alt=""
                  />
                  <div className="mx-4">
                    <h1 className="text-sm text-gray-700 ">{article.author}</h1>
                    <p className="text-sm text-gray-500 ">Journalist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default PublicArticle;
