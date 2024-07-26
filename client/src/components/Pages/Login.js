// @ts-nocheck
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { FaRegNewspaper } from "react-icons/fa";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string(),
});

async function loginUser(credentials) {
  return await fetch("http://localhost:3344/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    shouldUseNativeValidation: false,
  });

  let submitHandler = handleSubmit(async (data) => {
    const token = await loginUser({
      username,
      password,
    });

    if (username === token.user.username && password === token.user.password) {
      setToken(token);
    }
    setAlert(true);
  });

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl py-64 lg:flex  lg:items-center">
          <div className="mx-auto max-w-xl ">
            <h1 className="text-3xl text-center font-extrabold sm:text-5xl">
              <div className="flex gap-4 justify-center ">
                <FaRegNewspaper className="" />
                Mynews
              </div>

              <strong className="font-extrabold text-center text-red-700 sm:block">
                Admin Panel
              </strong>
            </h1>

            <p className="mt-4 sm:text-xl/relaxed text-center">
              Ju lutem vendosni username dhe password per te aksesuar
            </p>

            <div className="mt-2 justify-center gap-2">
              <form onSubmit={submitHandler}>
                <div className="p-6 container mx-auto flex flex-col">
                  {alert && (
                    <div>
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Incorrect Credentials</AlertTitle>
                        <AlertDescription>
                          Your username or password is incorrect!
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <div className="mt-6 mb-3">
                    <label
                      htmlFor="Username"
                      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        autoComplete="off"
                        {...register("username")}
                        onChange={async (e) => {
                          await setUserName(e.target.value);
                        }}
                        type="text"
                        id="Username"
                        name="username"
                        className="h-10 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Username"
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Username
                      </span>
                    </label>
                    {errors.username?.message && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.username?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="Password"
                      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        autoComplete="new-password"
                        {...register("password")}
                        type="password"
                        id="Password"
                        name="password"
                        className="h-10 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        placeholder="Password"
                        onChange={async (e) => {
                          return await setPassword(e.target.value);
                        }}
                      />

                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                    {errors.password?.message && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.password?.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex justify-center">
                    <Button className="border mt-2 py-4 px-6 " type="submit">
                      Login
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
