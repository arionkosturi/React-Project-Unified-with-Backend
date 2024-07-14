import React from "react";
import Header from "../Header";
import { useMutateArticle, useSingleArticle } from "../hooks/useFetchArticles";
import { FaInfoCircle } from "react-icons/fa";
import Alert from "../Alert";
function Article() {
  const { mutate } = useMutateArticle();

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
  return (
    <>
      <Header />
      <div>
        <section className={" container mx-auto dark:bg-gray-900  "}>
          <div className="container mx-auto ">
            {!article.isPublished && (
              <div className="bg-amber-300 flex text-neutral-600  justify-between p-4 h-16  text-neutral-800container mx-auto dark:bg-gray-900 gap-4">
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
            <div className="mt-2 lg:-mx-6">
              <p className="block mb-4 text-3xl font-semibold text-gray-800 dark:text-white">
                {article.title}
              </p>
              <img
                className="object-cover w-[90%] lg:mx-6 rounded-xl h-72"
                src={article.imgUrl}
                alt=""
              />
              <div className="mt-6  lg:mt-0 lg:mx-6 ">
                <p className="text-lg p-2 text-purple-700 font-bold uppercase">
                  {article.category}
                </p>
                <p className="block mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                  {article.description}
                </p>
                <p className="mt-3 text-lg text-gray-500 dark:text-gray-300 md:text-md">
                  {article.content}
                </p>
                <p className="my-8 text-lg text-gray-500 dark:text-gray-300 md:text-md content-2"></p>
                <div className="img2 w-[90%]"></div>
                <p className="my-8 text-lg text-gray-500 dark:text-gray-300 md:text-md content-3"></p>
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
                    <h1 className="text-sm text-gray-700 dark:text-gray-200">
                      {article.author}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Journalist
                    </p>
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
