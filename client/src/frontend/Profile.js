import React from "react";
import Header from "./Header";
import { useSingleUser } from "../components/hooks/useFetch";
function Profile() {
  const { data: loggedUser } = useSingleUser();
  if (!loggedUser) {
    return "you are not logged in";
  }
  console.log(loggedUser);
  return (
    <>
      <Header />
      <div className="container mx-auto text-centerf">
        Profile
        <p>Your username: {loggedUser?.username}</p>
        <p>Admin: {loggedUser?.isAdmin ? "true" : "false"}</p>
        <p></p>
      </div>
    </>
  );
}

export default Profile;
