// @ts-nocheck
import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import AddArticle from "./Pages/AddArticle";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import useToken from "../components/useToken";
import Login from "../components/Pages/Login";
export default function Header() {
  const { token, setToken } = useToken();
  const [queryParameter] = useSearchParams();
  let editMode = queryParameter.get("id");
  const location = useLocation();
  const navigate = useNavigate();
  let createMode = location.pathname;
  let handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/";
  };
  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center py-4">
        <div className="w-1/2 font-semi  text-purple-700 text-xl ">
          <a href="/dashboard">
            <span className="text-4xl">
              <FaRegNewspaper />
            </span>
            <p>News - Backend</p>
          </a>
        </div>

        <nav className=" xl:relative top-16 xl:top-0 flex justify-end md:items-center bg-white   lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="mx-2 shadow cursor-pointer border py-1 px-2 hover:bg-slate-100"
          >
            Public Preview
          </p>
          {/* Render button if not 
                  in edit mode or create mode */}
          {editMode || createMode == "/new" ? (
            ""
          ) : (
            <AddArticle className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2" />
          )}
          {}
          <Button
            className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </nav>
      </div>
    </div>
  );
}
