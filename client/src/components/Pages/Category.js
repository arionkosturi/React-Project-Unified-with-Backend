// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import {
  useSingleCategory,
  useMutateCategory,
} from "../hooks/useFetchArticles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function Category() {
  const queryClient = useQueryClient();

  // const { mutate } = useMutateCategory();

  const { data: category, isPending, error } = useSingleCategory();
  let [categoryName, setCategoryName] = useState();
  let [categoryImg, setCategoryImg] = useState();
  let updateCategory = async (id) => {
    let { name, imgUrl } = id;
    return await (data) => axios.patch(
      `http:/localhost:3344/categories/${id.articleId}`,
      {
        name,
        imgUrl,
      }
    );
  };
  const mutation = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["single category"] });
    },
  });
  let handleSubmit = (e) => {
    e.preventDefault();
    let id = category._id;
    mutation.mutate();
    console.log(mutate.status);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="gap-2 p-2 flex flex-col container mx-auto"
      >
        <div>{mutate.status}</div>
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
          autoFocus
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
    </>
  );
}

export default Category;
