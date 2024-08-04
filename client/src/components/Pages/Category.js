// @ts-nocheck
import React, { useState } from "react";
import Header from "../Header";
import Dashboard from "./Dashboard";
import { Button } from "../ui/button";
import { useSingleCategory, useMutateCategory } from "../hooks/useFetch";
import { useNavigate } from "react-router";
import LeftPanel from "./LeftPanel";
import { useSingleUser } from "../hooks/useFetch";
function Category() {
  const navigate = useNavigate();
  const { data: loggedUser } = useSingleUser();
  const { mutate } = useMutateCategory();
  const { data: category } = useSingleCategory();
  let [categoryName, setCategoryName] = useState();
  let [categoryImg, setCategoryImg] = useState();

  let handleSubmit = (e) => {
    e.preventDefault();
    let id = category._id;
    mutate(
      {
        id,
        name: categoryName,
        imgUrl: categoryImg,
      },
      {
        onSuccess: () => {
          navigate("/dashboard/categories");
        },
      }
    );
  };
  if (!loggedUser.isAdmin) {
    return <Dashboard />;
  }
  return (
    <>
      {" "}
      <Header />
      <div className="container mx-auto flex flex-col sm:flex-row gap-4">
        <div className="mx-auto w-full sm:w-44">
          <LeftPanel />
          <p className="mt-2 bg-slate-200 text-purple-500  hover:bg-slate-100 p-2 text-center sm:text-left">
            Editing Category
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="gap-2 p-2 flex flex-col container mx-auto"
        >
          <h1 className="text-3xl py-2">
            <span className="text-red-600">Editing</span> Category
          </h1>
          <label htmlFor="categname">Category Name:</label>
          <input
            autoFocus
            id="categname"
            className="text-xl"
            defaultValue={category?.name}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <label htmlFor="categnimg">Category Image:</label>
          <textarea
            id="categimg"
            className="text-xl"
            defaultValue={category?.imgUrl}
            onChange={(e) => {
              setCategoryImg(e.target.value);
            }}
          />
          <img className="w-1/3" src={category?.imgUrl} alt="" />
          <Button type="submit">Save</Button>
        </form>
      </div>
    </>
  );
}

export default Category;
