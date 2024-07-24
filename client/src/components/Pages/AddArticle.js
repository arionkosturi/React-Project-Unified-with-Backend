import React from "react";
import { Link } from "react-router-dom";
import useToken from "../useToken";
import Dashboard from "./Dashboard";

function AddArticle({ className }) {
  const { token } = useToken();
  if (!token) {
    return <Dashboard />;
  }
  return (
    <Link to="/dashboard/new">
      <button className={className}>Add new Article</button>
    </Link>
  );
}

export default AddArticle;
