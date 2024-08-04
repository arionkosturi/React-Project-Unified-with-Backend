// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import Header from "../Header";
import CustomEditor from "../CustomEditor";
import Alert from "../Alert";
import { FaTrash } from "react-icons/fa";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";
import { useFetchCategories } from "../hooks/useFetch";
const api = axios.create({
  baseURL: "http://localhost:3344/news/",
});

function EditArticle() {
  const { data: categories } = useFetchCategories();
  const navigate = useNavigate();
  const { toast } = useToast();
  let handleDelete = (e) => {
    e.preventDefault();
    api
      .delete(`/${id}`)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });

    navigate(`/dashboard`);
  };
  let handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch(
        `http://localhost:3344/news/${id}`,

        {
          title,
          description,
          content,
          author,
          sourceUrl,
          category,
          imgUrl,
          isPublished,
        }
      )
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });

    toast({
      variant: "success",
      title: "Success",
      description: "Perditesimi u ruajt me sukses!",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [content, setContent] = useState();
  const [author, setAuthor] = useState();
  const [sourceUrl, setSource] = useState();
  const [category, setCategory] = useState();
  const [isPublished, setIsPublished] = useState(false);
  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");

  React.useEffect(() => {
    api.get(`${id}`).then((res) => {
      setTitle(res.data.title);
      setDescription(res.data.description);
      setContent(res.data.content);
      setCategory(res.data.category);
      setAuthor(res.data.author);
      setSource(res.data.sourceUrl);
      setImgUrl(res.data.imgUrl);
      setIsPublished(res.data.isPublished);
    });

    return () => {};
  }, [id]);

  return (
    <div className="flex flex-col container gap-1 mx-auto">
      <Toaster />
      <Header className="text-white" />
      <h1 className="text-3xl text-purple-600">Edit Article:</h1>
      <label htmlFor="title" className="text-xl">
        Title:
      </label>
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
      <CustomEditor contentValue={content} setContentValue={setContent} />
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        placeholder="Enter Author"
        name="author p-2"
        className="border"
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <label htmlFor="source">Source</label>
      <input
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

      <select
        id="category"
        className="p-2"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        <option value={"Select Category"}>
          {category || "Select Category"}
        </option>
        {categories?.map((category, index) => {
          return (
            <option key={index} defaultValue={category.name}>
              {category.name}
            </option>
          );
        })}
      </select>
      <label htmlFor="title">Img Source</label>
      <textarea
        type="text"
        id="imgUrl"
        placeholder="Enter Img Source"
        name="imgUrl"
        className="border p-1"
        value={imgUrl}
        onChange={(e) => {
          setImgUrl(e.target.value);
        }}
      />
      <div className="flex border border-red-300">
        <span className="p-6">Image Preview:</span>
        <img
          className="w-1/3 my-6"
          src={imgUrl}
          alt="preview for article image"
        />
      </div>
      <div className="mx-auto container ">
        <form>
          <div className="flex">
            <Link to="/dashboard/all  ">
              <button className="mx-4 py-2 px-4 border shadow w-48">
                Cancel
              </button>
            </Link>
            <span className="border shadow hover:bg-red-500 bg-red-600 text-white">
              {/* Delete Button */}
              <Alert
                handleFunction={handleDelete}
                alertTriggerButton={
                  <div className="w-32 hover:text-slate-100 text-white border h-9  flex bg-red-500 hover:bg-red-600 gap-2 justify-center ">
                    <p className="py-1 ms-2 flex ">Delete</p>
                    <FaTrash className="mt-2 me-2" />
                  </div>
                }
                alertTitle="Jeni i sigurt?"
                alertMessage="Jeni duke fshire artikullin nga serveri. Jeni te sigurt per kete veprim?"
              />
            </span>
            <button
              onClick={handleSubmit}
              className="hover:bg-green-500 mx-4 border shadow bg-green-600 text-white w-1/5"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;
