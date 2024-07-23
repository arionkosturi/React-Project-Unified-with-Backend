// @ts-nocheck
import React, { useState } from "react";
import Header from "../../components/Header";
import useToken from "../useToken";
import { FaTrash } from "react-icons/fa";
import Dashboard from "../../components/Pages/Dashboard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import Alert from "../Alert";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
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
  useAddCategory,
  useDeleteCategory,
} from "../hooks/useFetchArticles";
import Category from "./Category";

function FetchCategories() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const { data: categories, isPending, error } = useFetchCategories();
  const { mutate, onSuccess } = useMutateCategory();
  const { mutate: remove } = useDeleteCategory();

  let handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name,
      imgUrl,
    });
  };

  if (isPending) return "Loading...";
  <img src="../../assets/img/finance.webp" alt="" />;
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
            variant={"secondary"}
            category={category}
            onClick={() => {
              console.log(category);
              navigate(`/dashboard/category/?id=${category._id}`);
            }}
          >
            {" "}
            Edit{" "}
          </Button>

          <Alert
            alertTitle={"TEST"}
            handleFunction={(e) => {
              let categoryId = category._id;
              remove(categoryId);
            }}
            alertTriggerButton={
              <Button variant={"destructive"}> Detele </Button>
            }
          />
        </div>
      </div>
    );
  });
}

function Categories() {
  const { token, setToken } = useToken();

  const { mutate: addCategory } = useAddCategory();
  const [openSheet, setOpenSheet] = useState(false);
  const [nameRequired, setNameRequired] = useState(false);

  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  // Fetch Categories
  const queryClient = useQueryClient();

  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");
  let handleOpen = () => {
    setOpenSheet(true);
  };
  let navigate = useNavigate();
  if (!token) {
    return <Dashboard />;
  }
  return (
    token && (
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

            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
              <SheetTrigger className="mx-auto mt-2 p-2">
                <Button onClick={handleOpen}>Krijo kategori</Button>
              </SheetTrigger>
              <SheetContent side={"right"}>
                <SheetHeader>
                  <SheetTitle>A je i sigurt?</SheetTitle>
                  <SheetDescription>
                    Je duke krijuar nje kategori te re.
                  </SheetDescription>
                </SheetHeader>
                <Form>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Emri i kategorise
                      </Label>
                      <Input
                        id="name"
                        defaultValue={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setNameRequired(false);
                        }}
                        className="col-span-3"
                      />
                    </div>
                    {nameRequired && (
                      <div className="text-center text-sm text-red-500">
                        Emri i kategorise eshte i detyrueshem!
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="imgSource" className="text-right">
                        Burimi i imazhit
                      </Label>
                      <Input
                        id="imgSource"
                        defaultValue={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          !name && setNameRequired(true);
                          name &&
                            addCategory(
                              {
                                name,
                                imgUrl,
                              },
                              {
                                onSuccess: () => {
                                  queryClient.invalidateQueries({
                                    queryKey: ["categories"],
                                  }),
                                    setName("");
                                  setImgUrl("");
                                  setOpenSheet(false);
                                  setNameRequired(false);
                                },
                              }
                            );
                        }}
                      >
                        Ruaj te dhenat
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </Form>
              </SheetContent>
            </Sheet>
          </section>
        </div>
      </>
    )
  );
}

export default Categories;
