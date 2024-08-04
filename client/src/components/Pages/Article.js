// @ts-nocheck
import React, { useState, useMemo, useRef } from "react";
import Header from "../Header";
import Login from "../../frontend/UserLogin";
import {
  useMutateArticle,
  useSingleArticle,
  useFetchCategories,
  useSingleUser,
} from "../hooks/useFetch";
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
  let [isEditingImgUrl, setIsEditingImgUrl] = useState(false);
  let [isEditingCategory, setIsEditingCategory] = useState(false);
  let [isEditingDescription, setIsEditingDescription] = useState(false);
  let [isEditingContent, setIsEditingContent] = useState(false);
  let [isEditingSource, setIsEditingSource] = useState(false);
  const { mutate } = useMutateArticle();
  const { data: article, isLoading, error } = useSingleArticle();
  const { data: loggedUser } = useSingleUser();

  if (!loggedUser?.isAdmin) {
    return <Login />;
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
  let editImgUrl = (e) => {
    let articleId = article._id;
    mutate({
      articleId,
      imgUrl: e.target.value,
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
    if (editorContent.length > 0) {
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
  let handleEditImgUrl = () => {
    setIsEditingImgUrl(true);
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
              {!isEditingImgUrl ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="container mx-auto">
                      {article.imgUrl ? (
                        <div className="flex justify-center">
                          <img
                            className="p-2 h-96 rounded-xl"
                            alt="article"
                            src={article.imgUrl}
                          />
                        </div>
                      ) : (
                        <img
                          className="flex justify-center object-contain w-[90%] lg:mx-6 rounded-xl h-72 text-center"
                          alt="article"
                          src={
                            "data:image/png;base64,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"
                          }
                        />
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="cursor-pointer" onClick={handleEditImgUrl}>
                        Edit ImgUrl
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
                    Editing ImgUrl. You can click outside the field. Autosave is
                    enabled!
                  </Badge>
                  <textarea
                    autoFocus
                    type="text"
                    id="imgUrl"
                    placeholder="Enter ImgUrl"
                    name="imgUrl"
                    className="w-full block mt-4 text-xl font-semibold text-gray-800"
                    rows="4"
                    defaultValue={article.imgUrl}
                    onChange={editImgUrl}
                    onBlur={() => {
                      setIsEditingImgUrl(false);
                    }}
                  />
                  <img
                    className="object-contain w-[90%] lg:mx-6 rounded-xl h-72 text-center"
                    src={article.imgUrl}
                    alt="article"
                  />
                </div>
              )}

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
                      {categories?.map((category, index) => {
                        return (
                          <option key={index} defaultValue={category}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>

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
