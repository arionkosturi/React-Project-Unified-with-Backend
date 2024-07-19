// @ts-nocheck
import React, { useState } from "react";
import Header from "../../components/Header";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaPlusCircle } from "react-icons/fa";
import {
  Sheet,
  SheetDescription,
  SheetHeader,
  SheetContent,
  SheetFooter,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import {
  useMutateCategory,
  useFetchCategories,
  useSingleCategory,
} from "../hooks/useFetchArticles";
import Category from "./Category";
function FetchCategories() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const { data: categories, isPending, error } = useFetchCategories();
  const { mutate, onSuccess } = useMutateCategory();
  let handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name,
      imgUrl,
    });
  };
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return categories.map((category, index) => {
    return (
      <div className="border justify-between flex gap-2" key={index}>
        <div className=" flex p-4 text-lg cursor-pointer gap-2">
          {category.name}
          {category.imgUrl && (
            <img className="w-1/3 mx-auto" src={category.imgUrl} alt="" />
          )}

          <Button
            category={category}
            onClick={() => {
              console.log(category);
              navigate(`/dashboard/category/?id=${category._id}`);
            }}
          >
            {" "}
            Edit{" "}
          </Button>
        </div>
      </div>
    );
  });
}

function Categories() {
  // Fetch Categories
  const queryClient = useQueryClient();
  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");
  const { data: category, isPending, error } = useSingleCategory();

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

          <Sheet>
            <SheetTrigger>Open</SheetTrigger>
            <SheetContent side={"right"}>
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    value="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <FaPlusCircle
            onClick={() => {
              console.log("click");
            }}
            className="text-xl mt-4 cursor-pointer"
          />
        </section>
      </div>
    </>
  );
}

export default Categories;
