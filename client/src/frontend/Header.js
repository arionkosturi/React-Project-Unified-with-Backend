// @ts-nocheck
import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import Login from "../components/Pages/Login";
import useToken from "../components/useToken";
export default function Header() {
  const { token, setToken } = useToken();

  const navigate = useNavigate();

  const [queryParameter] = useSearchParams();
  let editMode = queryParameter.get("id");
  const location = useLocation();
  let createMode = location.pathname;
  let handleLogin = () => {
    navigate("/dashboard");
  };

  let handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    window.location.href = "/";
  };
  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center py-4">
        <div className="w-1/2 font-semi  text-purple-700 text-xl ">
          <a href="/">
            <span className="text-4xl">
              <FaRegNewspaper />
            </span>
            <p>News</p>
          </a>
        </div>

        <nav className=" xl:relative top-16 xl:top-0 flex justify-end md:items-center bg-white   lg:shadow-none sm:mt-0 xl:mr-10 py-2 w-full">
          {!token ? (
            <Button
              className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2"
              onClick={handleLogin}
            >
              Login
            </Button>
          ) : (
            <>
              <p
                onClick={() => {
                  navigate("dashboard");
                }}
                className="mx-2 cursor-pointer border py-2 px-3 hover:bg-slate-100"
              >
                Dashboard
              </p>
              <Button
                className="flex hover:bg-slate-50 m-4 shadow border py-1 px-2"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
