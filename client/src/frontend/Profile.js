// @ts-nocheck
import React, { useState } from "react";
import Header from "./Header";
import {
  useSingleUser,
  useMutateUserProfile,
} from "../components/hooks/useFetch";

function Profile() {
  const { data: loggedUser } = useSingleUser();
  const { mutate } = useMutateUserProfile();
  const [alert, setAlert] = useState({});
  const [passwordAlert, setPasswordAlert] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPasword, setOldPassword] = useState("");

  if (!loggedUser) {
    return "you are not logged in";
  }
  let handleUsernameChange = (e) => {
    e.preventDefault();
    let id = loggedUser._id;
    if (username.length >= 5) {
      mutate(
        {
          id,
          username,
        },
        {
          onSuccess: () => {
            setAlert({
              message: "Username u ndryshua me sukses!",
              style: "p-2 text-green-600",
            });
          },
          onError: () => {
            setAlert({
              message: "Username nuk mund te ndryshohet!",
              style: "p-2 text-red-600",
            });
          },
        }
      );
    } else
      setAlert({
        message: "Username nuk mund te ndryshohet!",
        style: "p-2 text-red-600",
      });
  };
  let handlePasswordChange = (e) => {
    e.preventDefault();
    let id = loggedUser._id;
    if (oldPasword === loggedUser.password && password.length >= 5) {
      mutate(
        {
          id,
          password,
        },
        {
          onSuccess: () => {
            setPasswordAlert({
              message: "Password u ndryshua me sukses!",
              style: "p-2 text-green-600",
            });
          },
        }
      );
    } else
      setPasswordAlert({
        message: "Passwordi nuk mund te ndryshohet !",
        style: "p-2 text-red-600",
      });
  };

  return (
    <>
      <Header />
      <div className="container px-2 mx-auto flex flex-col gap-2">
        Profile
        <p>Your username: {loggedUser?.username}</p>
        <label htmlFor="username">
          Username: <span className={alert?.style}>{alert?.message}</span>
        </label>
        <input
          name="username"
          type="text"
          className="border p-1"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          defaultValue={loggedUser?.username}
        />
        <button
          className="border px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-400"
          onClick={handleUsernameChange}
        >
          Change Username
        </button>
        <label htmlFor="oldPassword">Old Password: </label>
        <input
          name="oldPassword"
          type="password"
          className="border p-1"
          defaultValue={""}
          onChange={(e) => {
            setOldPassword(e.target.value);
          }}
        />
        <label htmlFor="password">New Password: </label>
        <input
          name="password"
          type="password"
          className="border p-1"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          defaultValue={""}
        />
        {<span className={passwordAlert.style}>{passwordAlert.message}</span>}
        <button
          className="border px-3 py-1 rounded bg-purple-500 text-white hover:bg-purple-400"
          onClick={handlePasswordChange}
        >
          Change Password
        </button>
        <p>Admin: {loggedUser?.isAdmin ? "true" : "false"}</p>
        <p></p>
      </div>
    </>
  );
}

export default Profile;
