// @ts-nocheck
import React, { useState } from "react";
import Header from "../../components/Header";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";

//Mutate Article
let mutateSingleCategory = async (category) => {
  let { name, imgUrl } = category;
  return await axios.patch(`http://localhost:3344/categories/${category.id}`, {
    name,
    imgUrl,
  });
};
// Mutate Category
const useMutateCategory = (category) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single category"],
    mutationFn: mutateSingleCategory,
    onSuccess: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["single category"],
      });
    },
  });
};

function FetchCategories() {
  let [isEditingCategory, setIsEditingCategory] = useState(false);
  let [name, setName] = useState();
  let [imgUrl, setImgUrl] = useState();
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("http://localhost:3344/categories").then((res) => res.json()),
  });
  const { mutate, onSuccess } = useMutateCategory();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return data.map((category, index) => {
    return (
      <div className="border justify-between flex gap-2" key={index}>
        {!isEditingCategory ? (
          <p
            onDoubleClick={(e) => {
              setIsEditingCategory(true);
            }}
            className=" flex p-4 text-lg cursor-pointer"
          >
            {category.name}
          </p>
        ) : (
          <input
            placeholder="Enter Category"
            defaultValue={category.name}
            onBlur={() => setIsEditingCategory(false)}
            onChange={(e) => {
              let id = category._id;
              setName(e.target.value);
              mutate(
                {
                  id,
                  name,
                },
                {
                  onSuccess: () => {
                    console.log("test");
                  },
                }
              );
            }}
          />
        )}

        {category.imgUrl && (
          <img className="w-1/3" src={category.imgUrl} alt="" />
        )}
      </div>
    );
  });
}

function Categories() {
  // Fetch Categories
  let navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container mx-auto flex gap-4">
        <Button
          className="bg-purple-600 hover:bg-purple-500"
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Back
        </Button>
        <section
          className="
        container mx-auto flex flex-col 
        "
        >
          <h1 onClick={() => {}} className="text-xl font-semibold">
            Categories:
          </h1>
          <FetchCategories />
          <FaPlusCircle className="text-xl mt-4 " />
        </section>
      </div>
    </>
  );
}

export default Categories;
