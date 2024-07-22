// @ts-nocheck
import React, { useEffect, useState } from "react";
import AddArticle from "./Pages/AddArticle";
import { useFetchSearchAllArticles } from "./hooks/useFetchArticles";
import { FaRegNewspaper, FaBars, FaSearch } from "react-icons/fa";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Login from "../components/Pages/Login";
import useToken from "../components/useToken";
import useDebounce from "../frontend/useDebounce";
export default function Header() {
  const { token, setToken } = useToken();
  const [searchTerm, setSearchTerm] = useState();
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const { data: searchR } = useFetchSearchAllArticles(debouncedSearch);
  const navigate = useNavigate();

  let handleLogin = () => {
    navigate("/dashboard");
  };

  let handleSearch = (e) => {
    e.preventDefault();

    setSearchTerm(e.target.value);
  };

  let handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="flex justify-between container mx-auto items-center py-1">
      <div className=" font-semi  text-purple-700 text-xl ">
        <a href="/dashboard">
          <span className="text-4xl">
            <FaRegNewspaper />
          </span>
          <p>News</p>
        </a>
      </div>
      {!token ? (
        <Button
          className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2"
          onClick={handleLogin}
        >
          Login
        </Button>
      ) : (
        <div className="flex gap-2">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="h-12 mt-3 cursor-pointer border p-3 hover:bg-slate-100"
          >
            Public View
          </p>
          <p
            onClick={() => {
              navigate("/dashboard");
            }}
            className="h-12 mt-3 cursor-pointer border p-3 hover:bg-slate-100"
          >
            Dashboard
          </p>
          <Button
            className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
