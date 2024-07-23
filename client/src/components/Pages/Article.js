// @ts-nocheck
import React, { useState, useMemo, useRef } from "react";
import Header from "../Header";
import useToken from "../useToken";
import Login from "../Pages/Login";
import {
  useMutateArticle,
  useSingleArticle,
  useFetchCategories,
} from "../hooks/useFetchArticles";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Alert from "../Alert";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import HTMLReactParser from "html-react-parser";
import JoditEditor from "jodit-react";
import CheckHighlighted from "../CheckHighlited";
import { Alert as Njoftim, AlertDescription, AlertTitle } from "../ui/alert";
import { useSessionStorage } from "@uidotdev/usehooks";

function Article() {
  const { data: categories } = useFetchCategories();
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      height: 500,
      autofocus: true,
    }),
    []
  );
  let [njoftimIsOpen, setNjoftimIsOpen] = useSessionStorage("njoftim", 1);
  let [isEditingTitle, setIsEditingTitle] = useState(false);
  let [isEditingCategory, setIsEditingCategory] = useState(false);
  let [isEditingDescription, setIsEditingDescription] = useState(false);
  let [isEditingContent, setIsEditingContent] = useState(false);
  let [isEditingSource, setIsEditingSource] = useState(false);
  const { mutate } = useMutateArticle();
  const { data: article, isLoading, error } = useSingleArticle();
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data.</div>;
  }
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
  let editTitle = (e) => {
    let articleId = article._id;
    mutate({
      articleId,
      title: e.target.value,
    });
  };
  let editCategory = (e) => {
    let articleId = article._id;
    mutate({
      articleId,
      category: e.target.value,
    });
  };
  let editDescription = (e) => {
    let articleId = article._id;
    mutate({
      articleId,
      description: e.target.value,
    });
  };
  let editSourceUrl = (e) => {
    let articleId = article._id;
    mutate({
      articleId,
      sourceUrl: e.target.value,
    });
  };

  let editorContentSave = (e) => {
    let articleId = article._id;
    if (!editorContent) {
      setIsEditingContent(false);
    }
    if (editorContent) {
      mutate(
        {
          articleId,
          content: editorContent,
        },
        {
          onSuccess: () => {
            setIsEditingContent(false);
          },
        }
      );
    }
  };

  let handleEditSource = () => {
    setIsEditingSource(true);
  };

  return (
    <>
      <Header />

      <div>
        <section className={" container mx-auto   "}>
          <div className="container mx-auto ">
            {/* Banner when not published */}
            {!article.isPublished && (
              <div className="bg-amber-300 flex text-neutral-600   p-4  justify-center items-center  h-16  container mx-auto gap-4 ">
                <FaInfoCircle className="text-3xl" />
                <p className="text-md font-semibold">
                  Ky artikull eshte i arkivuar. Deshiron ta publikosh?
                </p>
                <Alert
                  handleFunction={handlePublish}
                  alertTriggerButton={
                    <button className="border shadow text-neutral-900 bg-white hover:bg-slate-50 px-3 text-center">
                      Publish
                    </button>
                  }
                  alertTitle="Jeni i sigurt?"
                  alertMessage="Deshiron ta Publikosh artikullin?"
                />
              </div>
            )}
            {/* Banner when is published */}
            {article.isPublished && (
              <div className="flex flex-col">
                <div className="bg-green-300 flex text-neutral-600 justify-center items-center  h-16  container gap-2">
                  <FaInfoCircle className="text-3xl" />
                  <p className="text-md font-semibold mt-1">
                    Ky artikull eshte i publikuar.
                  </p>
                  {/* Archive Article */}
                  <Alert
                    handleFunction={handlePublish}
                    alertTriggerButton={
                      <button className="justify-self-center h-9 border shadow text-white bg-red-400 hover:bg-red-500 px-2 text-center">
                        Archive
                      </button>
                    }
                    alertTitle="Jeni i sigurt?"
                    alertMessage={`Deshiron ta Arkivosh artikullin?`}
                  />
                  <Alert
                    handleFunction={handleHighlighted}
                    alertTriggerButton={
                      <div className="">
                        <CheckHighlighted
                          isHighlighted={
                            article.isHighlighted === true
                              ? "Featured"
                              : "Feature"
                          }
                          className={
                            article.isHighlighted === true
                              ? "border shadow w-32 h-9  bg-emerald-400 hover:bg-green-500 flex justify-center gap-2"
                              : "border shadow w-32 h-9   bg-amber-400 hover:bg-amber-500 flex justify-center gap-2"
                          }
                          handleHighlighted={undefined}
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
                </div>
              </div>
            )}
            {njoftimIsOpen === 1 ? (
              <Njoftim className=" mt-2 flex justify-between p-4" variant="">
                <FaInfoCircle className="h-4 w-4 text-xl text-white" />
                <div className="ml-2">
                  <AlertTitle>Info:</AlertTitle>

                  <AlertDescription>
                    Mund te besh double click mbi cdo fushe per ta modifikuar.
                    Fusha ruhet pasi klikon jashte saj.
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
              {!isEditingTitle ? (
                <p
                  onDoubleClick={() => {
                    setIsEditingTitle(true);
                  }}
                  className="block cursor-pointer mb-4 mx-auto container text-3xl font-semibold text-gray-800 "
                >
                  {article.title}
                </p>
              ) : (
                <div>
                  <Badge
                    className="m-4 flex justify-center"
                    variant="destructive"
                  >
                    Editing Title. You can click outside the field. Autosave is
                    enabled!
                  </Badge>

                  <textarea
                    autoFocus
                    type="text"
                    id="title"
                    placeholder="Enter Title"
                    name="title"
                    className="block mb-4 mx-auto container text-3xl font-semibold text-gray-800"
                    value={article.title}
                    onChange={editTitle}
                    onBlur={() => {
                      setIsEditingTitle(false);
                    }}
                  ></textarea>
                </div>
              )}

              <img
                className="object-cover w-[90%] lg:mx-6 rounded-xl h-72 text-center"
                src={article.imgUrl}
                alt=""
              />
              <div className="mt-8  lg:mt-0 lg:mx-6 ">
                {!isEditingCategory ? (
                  <p
                    onDoubleClick={() => {
                      setIsEditingCategory(true);
                    }}
                    className="cursor-pointer text-lg mt-2 p-2 text-purple-700 font-bold uppercase"
                  >
                    {article.category || "Category"}
                  </p>
                ) : (
                  <div>
                    <select
                      className="cursor-pointer bg-purple-100 text-lg mt-2 p-2 text-purple-700 font-bold uppercase"
                      onChange={editCategory}
                      onBlur={(e) => {
                        setIsEditingCategory(false);
                      }}
                    >
                      <option value={article.category}>
                        {article.category || "Select Category"}
                      </option>
                      {/* <option value=""></option> */}
                      {categories?.map((category, index) => {
                        return (
                          <option
                            key={index}
                            defaultValue={category}

                            // value={category.name}
                          >
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                    {/* <textarea
                      autoFocus
                      type="text"
                      id="category"
                      placeholder="Enter Category"
                      name="category"
                      className="w-1/5 h-10 text-lg p-2 mt-2 text-purple-700 font-bold uppercase"
                      value={article.category}
                      onChange={editCategory}
                      onBlur={(e) => {
                        setIsEditingCategory(false);
                      }}
                    /> */}
                    <Badge
                      className="m-4  justify-center"
                      variant="destructive"
                    >
                      Editing Category. You can click outside the field.
                      Autosave is enabled!
                    </Badge>
                  </div>
                )}
                {!isEditingDescription ? (
                  <p
                    onDoubleClick={() => {
                      setIsEditingDescription(true);
                    }}
                    className="cursor-pointer block mt-4 text-xl font-semibold text-gray-800 "
                  >
                    {article.description}
                  </p>
                ) : (
                  <div>
                    <Badge
                      className="w-full mt-2  justify-center"
                      variant="destructive"
                    >
                      Editing Description. You can click outside the field.
                      Autosave is enabled!
                    </Badge>
                    <textarea
                      autoFocus
                      type="text"
                      id="description"
                      placeholder="Enter Description"
                      name="description"
                      className="w-full block mt-4 text-xl font-semibold text-gray-800"
                      rows="4"
                      value={article.description}
                      onChange={editDescription}
                      onBlur={() => {
                        setIsEditingDescription(false);
                      }}
                    />
                  </div>
                )}
                {!isEditingContent ? (
                  <div
                    onDoubleClick={() => {
                      setIsEditingContent(true);
                    }}
                    className="cursor-pointer block mt-4  text-gray-700 "
                  >
                    {HTMLReactParser(`${article.content}`)}
                  </div>
                ) : (
                  <>
                    <Badge
                      className="w-full mt-2  justify-center"
                      variant="destructive"
                    >
                      Editing Content. You can click outside the field. Autosave
                      is enabled!
                    </Badge>
                    <JoditEditor
                      config={config}
                      ref={editor}
                      value={article.content}
                      onChange={(newContent) => setEditorContent(newContent)}
                      onBlur={editorContentSave}
                    />
                  </>
                )}

                <p className="my-8 text-lg text-gray-500  md:text-md content-2"></p>
                <div className="img2 w-[90%]"></div>
                <p className="my-8 text-lg text-gray-500 md:text-md content-3"></p>
                {!isEditingSource ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex">
                        {" "}
                        <a
                          href={article.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="finline-block mt-2 text-blue-500 underline hover:text-blue-400"
                        >
                          Source
                        </a>{" "}
                        <p className="text-neutral-400 ml-4 mt-2 flex">
                          - Hover to show edit button
                        </p>{" "}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p
                          className="cursor-pointer"
                          onClick={handleEditSource}
                        >
                          Edit Source
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div>
                    <Badge
                      className="w-full mt-2  justify-center"
                      variant="destructive"
                    >
                      Editing Source. You can click outside the field. Autosave
                      is enabled!
                    </Badge>
                    <textarea
                      autoFocus
                      type="text"
                      id="sourceUrl"
                      placeholder="Enter Source Url"
                      name="sourceUrl"
                      className="w-full block mt-4 text-xl font-semibold text-gray-800"
                      rows="4"
                      value={article.sourceUrl}
                      onChange={editSourceUrl}
                      onBlur={() => {
                        setIsEditingSource(false);
                      }}
                    />
                  </div>
                )}

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
    </>
  );
}

export default Article;
