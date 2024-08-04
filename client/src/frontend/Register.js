// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import { FaRegNewspaper, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router";

async function RegisterUser(credentials, setAlert, navigate) {
  return await fetch("http://localhost:3344/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((data) => {
      if (data.status === 201) {
        setAlert({
          value: false,
          message: "",
        });
        navigate("/userlogin");
        return data.json();
      } else if (!credentials.password)
        throw {
          message: "Please confirm password",
        };
      else
        throw {
          message: "Maybe this user exists or there is an error in the server!",
        };
    })
    .catch((err) => {
      setAlert({
        value: true,
        message: err.message,
        variant: "destructive",
      });
    });
}

export default function Register() {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    value: false,
    message: "",
  });
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },

    onSubmit: async ({ value }) => {
      await RegisterUser(
        {
          username: value.username,
          password: value.confirmPassword,
        },
        setAlert,
        navigate
      );
    },
  });

  return (
    <section className="container mx-auto">
      <div className="mx-auto max-w-screen-xl py-64 lg:flex  lg:items-center">
        <div className="mx-auto max-w-xl ">
          <h1 className="text-3xl text-center font-extrabold sm:text-5xl">
            <div className="flex gap-4 justify-center ">
              <FaRegNewspaper className="" />
              Mynews
            </div>

            <strong className="font-extrabold text-center text-red-700 sm:block">
              User Registration
            </strong>
          </h1>

          <p className="mx-6 mt-4 sm:text-xl/relaxed text-center">
            Ju lutem vendosni username dhe password per tu loguar
          </p>

          {alert.message.length > 0 && (
            <div>
              <Alert variant={alert.variant}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>User Error!</AlertTitle>
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            </div>
          )}
          <form
            className="px-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
              console.log(alert);
            }}
          >
            <div className="mt-6 mb-3">
              <form.Field
                name="username"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Username is required"
                      : value.length < 3
                        ? "Username must be at least 3 characters"
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
                  return (
                    <>
                      <label
                        className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                        htmlFor={field.name}
                      >
                        <input
                          autoComplete="off"
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
                      <p className="text-sm text-red-600 mt-1">
                        {field.state.meta.errors}
                      </p>
                    </>
                  );
                }}
              />
            </div>
            <div>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Password is required"
                      : value.length < 5
                        ? "Password must be at least 5 characters"
                        : undefined,
                  onChangeAsyncDebounceMs: 100,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in username'
                    );
                  },
                }}
                children={(field) => (
                  <div className="my-4">
                    <label
                      htmlFor={field.name}
                      className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                    >
                      <input
                        id={field.name}
                        name={field.name}
                        type="password"
                        placeholder="Password"
                        validators={{
                          onChange: () => {},
                        }}
                        className="h-10 p-2 peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                        Password
                      </span>
                    </label>
                    <p className="text-sm text-red-600 mt-1">
                      {field.state.meta.errors}
                    </p>{" "}
                  </div>
                )}
              />
              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) =>
                    fieldApi.getMeta().isDirty &&
                    value !== fieldApi.form.getFieldValue("password") &&
                    "Passwords do not match",
                }}
                children={(field) => (
                  <div className="">
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
                        Confirm Password
                      </span>
                    </label>
                    <p className="text-sm text-red-600 mt-1">
                      {field.state.meta.errors}
                    </p>{" "}
                    <p>
                      Je i regjistruar?{" "}
                      <span
                        className="hover:cursor-pointer underline text-blue-700"
                        onClick={() => {
                          navigate("/userlogin");
                        }}
                      >
                        Login
                      </span>
                    </p>
                  </div>
                )}
              />
            </div>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className="mt-4 gap-4 flex justify-center">
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="flex bg-purple-600 hover:bg-purple-500 shadow border py-1 px-2"
                  >
                    {isSubmitting ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Register"
                    )}
                  </Button>
                  <Button
                    type="reset"
                    onClick={() => {
                      setAlert({
                        value: false,
                      });
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
