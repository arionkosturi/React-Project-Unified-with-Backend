// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import useToken from "../useToken";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import { FaRegNewspaper } from "react-icons/fa";
import { Input } from "../ui/input";
import { useNavigate } from "react-router";

async function loginUser(credentials) {
  return await fetch("http://localhost:3344/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export default function Signin() {
  const navigate = useNavigate();
  const { token, setToken } = useToken();
  const [alert, setAlert] = useState(false);

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      const token = await loginUser({
        username: value.username,
        password: value.password,
      });
      if (
        value.username === token.user.username &&
        value.password === token.user.password
      ) {
        setToken(token);

        setAlert(false);
        window.location.reload(true);
      } else setAlert(true);
    },
  });

  return (
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <div className="mt-6 mb-3">
              <form.Field
                name="username"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "A first name is required"
                      : value.length < 3
                        ? "First name must be at least 3 characters"
                        : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <label
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        htmlFor={field.name}
                      >
                        <input
                          className="h-10 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          placeholder="Username"
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                          Username
                        </span>
                      </label>
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="password"
                children={(field) => (
                  <>
                    <label
                      htmlFor={field.name}
                      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        type="password"
                        placeholder="Password"
                        className="h-10 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                  </>
                )}
              />
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className="mt-4 gap-4 flex justify-center">
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? "..." : "Submit"}
                  </Button>
                  <Button
                    type="reset"
                    onClick={() => {
                      setAlert(false);
                      form.reset();
                    }}
                  >
                    Reset
                  </Button>
                </div>
              )}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
