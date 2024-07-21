// @ts-nocheck
import React, { useState, Component, useRef, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import JoditEditor, { Jodit } from "jodit-react";
import CustomEditor from "./CustomEditor";
import { Toaster } from "./ui/toaster";
import { useAddArticle, useFetchCategories } from "./hooks/useFetchArticles";
import useToken from "./useToken";

function ArticleForm() {
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
  const { data: categories, isPending, error } = useFetchCategories();
  const navigate = useNavigate();
  const { mutate } = useAddArticle();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [sourceUrl, setSource] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  let handleSubmit = (e) => {
    e.preventDefault();
    const article = { title, description, content };
    mutate({
      title,
      description,
      content: editorContent,
      author,
      sourceUrl,
      category,
      imgUrl,
    });
  };
  const { token, setToken } = useToken();

  if (!token) {
    return <Header />;
  }
  return (
    <div className="flex flex-col container gap-2 mx-auto">
      <Toaster />
      <Header />

      <h1 className="text-3xl text-center text-green-600">
        Creating New Article
      </h1>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        placeholder="Enter Title"
        name="title"
        className="border p-2"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <label htmlFor="description">Description</label>
      <textarea
        type="text"
        id="description"
        placeholder="Enter Description"
        name="description"
        className="border p-2"
        rows="4"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <label htmlFor="content">Content:</label>
      {/* <CustomEditor contentValue={content} setContentValue={setContent} /> */}
      <JoditEditor
        autoFocus
        config={config}
        ref={editor}
        value={editorContent}
        onChange={(newContent) => setEditorContent(newContent)}
        // onBlur={editorContentSave}
      />
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        placeholder="Enter Author"
        name="author"
        className="border p-2"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <label htmlFor="source">Source:</label>
      <textarea
        // @ts-ignore
        type="text"
        id="source"
        placeholder="Enter Source"
        name="source"
        className="border p-2"
        value={sourceUrl}
        onChange={(e) => {
          setSource(e.target.value);
        }}
      />
      {/* <label htmlFor="category">Category:</label>
  <input
    type="text"
    id="category"
    placeholder="Enter Category"
    name="category"
    className="border p-2"
    value={category}
    onChange={(e) => {
      setCategory(e.target.value);
    }}
  /> */}
      <label htmlFor="category">Category:</label>
      <select
        id="category"
        className="p-2"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value="">Select a category</option>
        {/* <option value="">Select Category</option> */}
        {categories?.map((category, index) => {
          return (
            <option
              key={index}
              defaultValue={category.name}

              // value={category.name}
            >
              {category.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="imgUrl">Image URL</label>
      <textarea
        type="text"
        id="imgUrl"
        placeholder="Enter Img Source"
        name="imgUrl"
        className="border"
        value={imgUrl}
        onChange={(e) => {
          setImgUrl(e.target.value);
        }}
      />
      <div className="flex border border-red-300">
        <span className="p-6">Image Preview:</span>
        <img className="w-1/3 my-6" src={imgUrl} />
      </div>
      <div className="mx-auto container">
        <form>
          <Link to="/">
            <button className="mx-4 border shadow w-1/5">Cancel</button>
          </Link>
          <button className="mx-4 border bg-red-600 text-white shadow w-1/5">
            Delete
          </button>
          <button
            onClick={handleSubmit}
            className="mx-4 border shadow bg-green-600 text-white w-1/5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default ArticleForm;
