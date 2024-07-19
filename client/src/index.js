// @ts-nocheck
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import "./index.css";
import "@radix-ui/themes/styles.css";
import Home from "./components/Home";
import Categories from "./components/Pages/Categories";
import NotFoundPage from "./components/Pages/NotFoundPage";
import ArticleForm from "./components/ArticleForm";
import EditArticle from "./components/Pages/EditArticle";
import Paginate from "./components/Paginate";
import Testing from "./components/Pages/Testing";
import Dashboard from "./components/Pages/Dashboard";
import Article from "./components/Pages/Article";
import Login from "./components/Pages/Login";
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
    path: "/dashboard/new",
    element: <ArticleForm />,
  },
  {
    path: "/dashboard/edit",
    element: <EditArticle />,
  },
  {
    path: "/dashboard/testing",
    element: <Testing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard/article",
    element: <Article />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard/categories",
    element: <Categories />,
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
