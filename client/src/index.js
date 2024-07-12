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
    path: "/new",
    element: <ArticleForm />,
  },
  {
    path: "/edit",
    element: <EditArticle />,
  },
  {
    path: "/testing",
    element: <Testing />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/article",
    element: <Article />,
  },
  {
    path: "/login",
    element: <Login />,
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
