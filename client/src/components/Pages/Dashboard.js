// @ts-nocheck
import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../ui/command";
import AddArticle from "../Pages/AddArticle";
import Articles from "../Pages/Articles";
import Header from "../Header";
import Paginate from "../Paginate";
import Login from "../Pages/Login";
import useToken from "../useToken";

function Dashboard() {
  let [currentPage, setCurrentPage] = useState("0");
  let [isPublished, setIsPublished] = useState();
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row mx-2 sm:container sm:mx-auto">
        <div className="flex md:max-w-40 w-full">
          <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem
                  onClick={() => {
                    console.log("click");
                  }}
                >
                  Settings
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="max-w-full flex flex-col">
          <Articles
            isPublished={isPublished}
            setIsPublished={setIsPublished}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
