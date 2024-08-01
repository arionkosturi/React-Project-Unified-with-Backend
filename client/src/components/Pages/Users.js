// @ts-nocheck
import React, { useState } from "react";
import Header from "../Header";
import Dashboard from "./Dashboard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Alert from "../Alert";
import { useNavigate, useSearchParams, Link, NavLink } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  useFetchUsers,
  useDeleteUser,
  useSingleUser,
  useMutateUsers,
} from "../hooks/useFetch";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import LeftPanel from "./LeftPanel";
function FetchUsers({ loggedUser }) {
  let navigate = useNavigate();
  const { data: users, isPending, error } = useFetchUsers();
  const { mutate: remove } = useDeleteUser();
  const { mutate } = useMutateUsers();
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    users &&
    users?.map((user) => {
      return (
        <TableRow key={user._id}>
          <TableCell className="font-medium">{user.username}</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>
            <Select
              onValueChange={(value) => {
                let userId = user._id;
                if (userId !== loggedUser._id) {
                  mutate({
                    userId,
                    isAdmin: value,
                  });
                }
              }}
            >
              <SelectTrigger
                className="w-[180px]"
                disabled={user._id === loggedUser._id}
              >
                <SelectValue placeholder={user.isAdmin ? "Admin" : "User"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="false">User</SelectItem>
                <SelectItem value="true">Admin</SelectItem>
              </SelectContent>
            </Select>
          </TableCell>
          <TableCell className="text-right">
            {" "}
            <Button
              variant={"secondary"}
              className="mr-1"
              onClick={() => {
                // navigate(`/dashboard/user/?id=${user._id}`);
              }}
            >
              {" "}
              Edit{" "}
            </Button>
            <Alert
              alertTitle={"Po fshin perdoruesin"}
              alertMessage={`Deshiron ta fshish perdoruesin: "${user.username}" ?`}
              handleFunction={(e) => {
                let userId = user._id;
                if (loggedUser._id !== userId) {
                  remove(userId);
                }
              }}
              alertTriggerButton={
                <Button
                  variant={"destructive"}
                  disabled={loggedUser._id == user._id}
                >
                  {" "}
                  Detele{" "}
                </Button>
              }
            />
          </TableCell>
        </TableRow>
      );
    })
  );
}

function Users() {
  const queryClient = useQueryClient();
  let { data: loggedUser } = useSingleUser();
  const [queryParameter] = useSearchParams();
  let navigate = useNavigate();
  if (!loggedUser?.isAdmin) {
    return <Dashboard />;
  }
  return (
    loggedUser?.isAdmin && (
      <>
        <Header />
        <div className="container mx-auto mb-2">
          <h1 className="text-3xl">
            Users
            <span className="bg-green-500 text-white ml-2 px-2 py-1">
              Management
            </span>
          </h1>
        </div>
        <div className="container mx-auto flex gap-4">
          <LeftPanel />
          <section
            className="
        w-full p-0
      "
          >
            <Table>
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Username</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <FetchUsers loggedUser={loggedUser} />
              </TableBody>
            </Table>
          </section>
        </div>
      </>
    )
  );
}

export default Users;
