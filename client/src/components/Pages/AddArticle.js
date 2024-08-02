import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";
import { useSingleUser } from "../hooks/useFetch";

function AddArticle({ className }) {
  const { data: loggedUser } = useSingleUser();
  if (!loggedUser.isAdmin) {
    return <Dashboard />;
  }
  return (
    <Link to="/dashboard/new">
      <button className={className}>Add new Article</button>
    </Link>
  );
}

export default AddArticle;
