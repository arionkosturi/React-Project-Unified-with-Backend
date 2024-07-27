// @ts-nocheck
import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import useToken from "../components/useToken";
export default function Header() {
  const { token } = useToken();
  const navigate = useNavigate();

  let handleLogin = () => {
    navigate("/dashboard/all");
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
        <a href="/dashboard/all">
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
              navigate("/dashboard/all");
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
