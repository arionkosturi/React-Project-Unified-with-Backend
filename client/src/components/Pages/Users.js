// @ts-nocheck
import React, { useState } from "react";
import Header from "../Header";
import Dashboard from "./Dashboard";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Alert from "../Alert";
import {
  useFetchUsers,
  useDeleteUser,
  useSingleUser,
  useMutateUsers,
  useFetchSearchedUsers,
} from "../hooks/useFetch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import LeftPanel from "./LeftPanel";
import useDebounce from "../../frontend/useDebounce";

function FetchUsers({ loggedUser, searchTerm }) {
  const { data: users, isPending, error } = useFetchUsers();
  const { mutate: remove } = useDeleteUser();
  const { mutate } = useMutateUsers();
  const [newPassword, setNewPassword] = useState();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: searchUsers } = useFetchSearchedUsers(debouncedSearch);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return searchTerm
    ? searchUsers?.map((user) => {
        return (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell>
              <Select
                className="flex justify-end"
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
                  className="flex items-center w-[170px] md:w-[280px] max-w-[480px]"
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mr-2">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change User Password</DialogTitle>
                    <DialogDescription>
                      <div className="mt-2">
                        Jeni duke ndryshuar passwordin per perdoruesin:{" "}
                        <span className="text-md text-red-600">
                          {user.username}
                        </span>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="username" className="text-right">
                        Password
                      </Label>
                      <Input
                        autoComplete="off"
                        id="password"
                        defaultValue=""
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={() => {
                        let userId = user._id;
                        mutate({
                          userId,
                          password: newPassword,
                        });
                      }}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
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
                    disabled={loggedUser._id === user._id}
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
    : users &&
        users?.map((user) => {
          return (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>
                <Select
                  className="flex justify-end"
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
                    className="flex items-center w-[170px] md:w-[280px] max-w-[480px]"
                    disabled={user._id === loggedUser._id}
                  >
                    <SelectValue
                      placeholder={user.isAdmin ? "Admin" : "User"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">User</SelectItem>
                    <SelectItem value="true">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-right">
                {" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change User Password</DialogTitle>
                      <DialogDescription>
                        <div className="mt-2">
                          Jeni duke ndryshuar passwordin per perdoruesin:{" "}
                          <span className="text-md text-red-600">
                            {user.username}
                          </span>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Password
                        </Label>
                        <Input
                          autoComplete="off"
                          id="password"
                          defaultValue=""
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                          }}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => {
                          let userId = user._id;
                          mutate({
                            userId,
                            password: newPassword,
                          });
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
                      disabled={loggedUser._id === user._id}
                    >
                      {" "}
                      Detele{" "}
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          );
        });
}

function Users() {
  let { data: loggedUser } = useSingleUser();
  const [searchTerm, setSearchTerm] = useState();

  let handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

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
          <div className="flex flex-col md:flex-row container mx-auto">
            <LeftPanel />
            <section className="container mx-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      {" "}
                      <div className="flex items-center">
                        <label
                          htmlFor="search__input"
                          className="hidden md:flex"
                        >
                          Username
                        </label>
                        <div className="flex mx-auto text-purple-700 dark:text-purple-300 group hover:ring ring-purple-300">
                          <input
                            type="search"
                            id="search__input"
                            onChange={handleSearch}
                            className=" border-purple-600 w-full bg-white dark:bg-neutral-900 focus:ring-opacity-70 p-1 border border-opacity-30 focus:outline-none focus:ring focus:ring-purple-600"
                            placeholder="Username"
                          />
                        </div>
                      </div>
                    </TableHead>
                    {/* <TableHead className="text-center">Username</TableHead> */}
                    <TableHead className="text-center">Role</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  <FetchUsers loggedUser={loggedUser} searchTerm={searchTerm} />
                </TableBody>
              </Table>
            </section>
          </div>
        </div>
      </>
    )
  );
}

export default Users;
