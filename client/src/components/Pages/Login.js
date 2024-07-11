// @ts-nocheck
import React, { useState } from "react";

async function loginUser(credentials) {
  return fetch("http://localhost:3344/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password,
    });
    console.log(token.user.username);
    if (username === token.user.username && password === token.user.password) {
      console.log(username);
      setToken(token);

      localStorage.setItem("user", JSON.stringify(token["user"]));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <p>Username</p>
        <input
          className="border"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        <p>Password</p>
        <input
          className="border"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div>
        <button className="border mt-2 py-2 px-3" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
