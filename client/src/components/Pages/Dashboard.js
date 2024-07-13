// @ts-nocheck
import React, { useState, Component } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import CustomEditor from "../CustomEditor";
import { Toaster } from "../ui/toaster";
import { useAddArticle } from "../hooks/useFetchArticles";
function Dashboard() {
  const navigate = useNavigate();
  const { mutate } = useAddArticle();
  const [contentValue, setContentValue] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [sourceUrl, setSource] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  let handleSubmit = (e) => {
    e.preventDefault();
    const article = { title, description, content: contentValue };
    mutate({
      title,
      description,
      contentValue,
      author,
      sourceUrl,
      category,
      imgUrl,
    });
  };
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
      <CustomEditor
        contentValue={contentValue}
        setContentValue={setContentValue}
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
      <label htmlFor="category">Category:</label>
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
      />
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
export default Dashboard;
