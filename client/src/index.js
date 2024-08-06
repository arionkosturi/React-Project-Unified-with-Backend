// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "@radix-ui/themes/styles.css";
import Home from "./frontend/Home";
import Categories from "./components/Pages/Categories";
import Category from "./components/Pages/Category";
import PublicCategory from "./frontend/Category";
import NotFoundPage from "./components/Pages/NotFoundPage";
import ArticleForm from "./components/ArticleForm";
import EditArticle from "./components/Pages/EditArticle";
import Dashboard from "./components/Pages/Dashboard";
import Users from "./components/Pages/Users";
import Article from "./components/Pages/Article";
import PublicArticle from "./frontend/Article";
import PublishedArticles from "./components/Pages/PublishedArticles";
import Reklama from "./components/Pages/Reklama";
import UserLogin from "./frontend/UserLogin";
import Register from "./frontend/Register";
import Profile from "./frontend/Profile";
import Saved from "./frontend/Saved";
import Liked from "./frontend/Liked";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/article",
    element: <PublicArticle />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/category/:category",
    element: <PublicCategory />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/new",
    element: <ArticleForm />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/users",
    element: <Users />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/reklama",
    element: <Reklama />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/edit",
    element: <EditArticle />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/all",
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/",
    element: <Dashboard />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/article",
    element: <Article />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/published",
    element: <PublishedArticles />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/saved",
    element: <Saved />,
  },
  {
    path: "/liked",
    element: <Liked />,
  },
  {
    path: "/userlogin",
    element: <UserLogin />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard/categories",
    element: <Categories />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/dashboard/category/",
    element: <Category />,
    errorElement: <NotFoundPage />,
  },
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
