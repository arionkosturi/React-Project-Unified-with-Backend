// @ts-nocheck
import React, { useState, useMemo, useRef } from "react";
import Header from "../Header";
import {
  useMutateArticle,
  // useMutateContent,
  useSingleArticle,
} from "../hooks/useFetchArticles";
import { FaInfoCircle } from "react-icons/fa";
import Alert from "../Alert";
import { Badge } from "../ui/badge";
import HTMLReactParser from "html-react-parser";
import JoditEditor, { Jodit } from "jodit-react";
import CheckHighlighted from "../CheckHighlited";
import { Alert as Njoftim, AlertDescription, AlertTitle } from "../ui/alert";
import { Edit } from "lucide-react";
import { Editor } from "react-simple-wysiwyg";

function Article() {
  const editor = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  let height;
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      height: 500,
    }),
    [height]
  );

  let [isEditingTitle, setIsEditingTitle] = useState(false);
  let [isEditingCategory, setIsEditingCategory] = useState(false);
  let [isEditingDescription, setIsEditingDescription] = useState(false);
  let [isEditingContent, setIsEditingContent] = useState(false);

  const { mutate, onSuccess } = useMutateArticle();
  // const { mutate: content } = useMutateContent();
  const { data: article, isLoading, isError, error } = useSingleArticle();
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
  let editContent = (e) => {
    let articleId = article._id;
    mutate({
      articleId,
      content: e.target.value,
    });
  };
  let editorContentSave = (e) => {
    let articleId = article._id;
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
  };
  // let editContent = (e) => {
  //   let articleId = article._id;
  //   content({
  //     articleId,
  //     content,
  //   });
  // };
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
              <div className="bg-green-300 flex text-neutral-600 justify-center items-center  h-16  container gap-2 ">
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
            )}
            <Njoftim className="mt-2 p-4" variant="">
              <FaInfoCircle className="h-4 w-4 text-white" />
              <AlertTitle>Info:</AlertTitle>
              <AlertDescription>
                Mund te besh double click mbi cdo fushe per ta modifikuar.{" "}
                <br></br> Fusha ruhet pasi klikon jashte saj.
              </AlertDescription>
            </Njoftim>
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
                <>
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
                </>
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
                    {article.category}
                  </p>
                ) : (
                  <>
                    <textarea
                      // @ts-ignore
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
                    />
                    <Badge
                      className="m-4  justify-center"
                      variant="destructive"
                    >
                      Editing Category. You can click outside the field.
                      Autosave is enabled!
                    </Badge>
                  </>
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
                  <>
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
                      // @ts-ignore
                      rows="4"
                      value={article.description}
                      onChange={editDescription}
                      onBlur={() => {
                        setIsEditingDescription(false);
                      }}
                    />
                  </>
                )}
                {!isEditingContent ? (
                  <p
                    onDoubleClick={() => {
                      setIsEditingContent(true);
                    }}
                    className="cursor-pointer block mt-4  text-gray-700 "
                  >
                    {HTMLReactParser(`${article.content}`)}
                  </p>
                ) : (
                  <JoditEditor
                    config={config}
                    autoFocus
                    ref={editor}
                    value={article.content}
                    onChange={(newContent) => setEditorContent(newContent)}
                    onBlur={editorContentSave}
                  />
                )}

                <p className="my-8 text-lg text-gray-500  md:text-md content-2"></p>
                <div className="img2 w-[90%]"></div>
                <p className="my-8 text-lg text-gray-500 md:text-md content-3"></p>
                <a
                  href="${data.sourceUrl}"
                  target="_blank"
                  className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
                >
                  Source
                </a>
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
