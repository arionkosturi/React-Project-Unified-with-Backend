// @ts-nocheck
import React from "react";
import { FaRegNewspaper } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useSingleUser } from "./hooks/useFetch";
export default function Header() {
  const navigate = useNavigate();
  const { data: loggedUser } = useSingleUser();

  let handleLogin = () => {
    navigate("/dashboard/all");
  };

  let handleLogout = (e) => {
    e.preventDefault();
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
      {!loggedUser?.isAdmin ? (
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
            className="h-12 mt-3 cursor-pointer border p-3 hover:bg-slate-100 text-sm "
          >
            Public View
          </p>
          <p
            onClick={() => {
              navigate("/dashboard/all");
            }}
            className="h-12 mt-3 cursor-pointer border p-3 hover:bg-slate-100 text-sm"
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
