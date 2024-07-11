// @ts-nocheck
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 5 characters.",
  }),
});

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const token = await loginUser({
  //     username,
  //     password,
  //   });
  //   if (username === token.user.username && password === token.user.password) {
  //     setToken(token);
  //   }
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  let submitHandler = handleSubmit(async (e) => {
    const token = await loginUser({
      username,
      password,
    });
    if (username === token.user.username && password === token.user.password) {
      setToken(token);
    }
  });

  // useEffect(() => {
  //   const keyDownHandler = (e) => {
  //     console.log("User pressed: ", event.key);

  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       console.log(e.target.value);
  //       // 👇️ Call submit function here
  //       submitHandler(e);
  //     }
  //   };

  //   document.addEventListener("keydown", keyDownHandler);

  //   return () => {
  //     document.removeEventListener("keydown", keyDownHandler);
  //   };
  // }, []);
  return (
    <form onSubmit={submitHandler}>
      <div className="p-6 mt-24 container mx-auto">
        <label>
          <p>Username</p>
          <input
            {...register("username")}
            className="border"
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
          {errors.username?.message && (
            <p className="text-sm text-red-600 mt-1">
              {errors.username?.message}
            </p>
          )}
        </label>
        <label>
          <p>Password</p>
          <input
            {...register("password")}
            className="border"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password?.message && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password?.message}
            </p>
          )}
        </label>
        <div>
          <button className="border mt-2 py-2 px-3" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <label>
  //       <p>Username</p>
  //       <input
  //         className="border"
  //         type="text"
  //         onChange={(e) => setUserName(e.target.value)}
  //       />
  //     </label>
  //     <label>
  //       <p>Password</p>
  //       <input
  //         className="border"
  //         type="password"
  //         onChange={(e) => setPassword(e.target.value)}
  //       />
  //     </label>
  //     <div>
  //       <button className="border mt-2 py-2 px-3" type="submit">
  //         Submit
  //       </button>
  //     </div>
  //   </form>
  // );
}
