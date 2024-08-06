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
import { useNavigate } from "react-router";
import Alert from "../Alert";
import { useFetchReklama, useSingleUser } from "../hooks/useFetch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import LeftPanel from "./LeftPanel";
import useDebounce from "../../frontend/useDebounce";

function FetchReklama() {
  let navigate = useNavigate();
  const { data: reklama, isPending, error } = useFetchReklama();
  // const { mutate: remove } = useDeleteCategory();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return reklama?.map((reklama, index) => {
    return (
      <div className="border justify-between flex gap-2" key={index}>
        <div className=" flex p-4 text-lg cursor-pointer gap-2">
          {reklama.title}
          {reklama.imgUrl && (
            <img className="w-1/3 mx-auto" src={reklama.imgUrl} alt="" />
          )}

          <Button
            variant={"secondary"}
            category={reklama}
            onClick={() => {
              navigate(`/dashboard/reklama/?id=${reklama._id}`);
            }}
          >
            {" "}
            Edit{" "}
          </Button>

          <Alert
            alertTitle={"Po fshin reklamen"}
            alertMessage={`Deshiron ta fshish reklamen: "${reklama.name}" ?`}
            handleFunction={(e) => {
              let reklamaId = reklama._id;
              // remove(reklamaId);
            }}
            alertTriggerButton={
              <Button variant={"destructive"}> Detele </Button>
            }
          />
        </div>
      </div>
    );
  });
}

function Reklama() {
  // const { mutate: addCategory } = useAddCategory();
  const [openSheet, setOpenSheet] = useState(false);
  const [nameRequired, setNameRequired] = useState(false);
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  // const queryClient = useQueryClient();
  let { data: loggedUser } = useSingleUser();
  let handleOpen = () => {
    setOpenSheet(true);
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
            Article
            <span className="bg-green-500 text-white ml-2 px-2 py-1">
              Categories
            </span>
          </h1>
        </div>
        <div className="container mx-auto flex flex-col sm:flex-row gap-4">
          <LeftPanel />
          <section
            className="
      container mx-auto flex flex-col 
      "
          >
            <h1 onClick={() => {}} className="text-xl font-semibold">
              Reklama:
            </h1>
            <FetchReklama />
            <Sheet open={openSheet} onOpenChange={setOpenSheet}>
              <SheetTrigger className="mx-auto mt-2 p-2">
                <Button onClick={handleOpen}>Krijo Reklame</Button>
              </SheetTrigger>
              <SheetContent side={"right"}>
                <SheetHeader>
                  <SheetTitle>A je i sigurt?</SheetTitle>
                  <SheetDescription>
                    Je duke krijuar nje kategori te re.
                  </SheetDescription>
                </SheetHeader>
                <form>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Emri i kategorise
                      </Label>
                      <Input
                        id="name"
                        defaultValue={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setNameRequired(false);
                        }}
                        className="col-span-3"
                      />
                    </div>
                    {nameRequired && (
                      <div className="text-center text-sm text-red-500">
                        Emri i kategorise eshte i detyrueshem!
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="imgSource" className="text-right">
                        Burimi i imazhit
                      </Label>
                      <Input
                        id="imgSource"
                        defaultValue={imgUrl}
                        onChange={(e) => setImgUrl(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      {/* <Button
                        type="button"
                        //onClick={(e) => {
                        // e.preventDefault();
                        // !name && setNameRequired(true);
                        // name &&
                        //   addCategory(
                        //     {
                        //       name,
                        //       imgUrl,
                        //     },
                        //     {
                        //       onSuccess: () => {
                        //         queryClient.invalidateQueries({
                        //           queryKey: ["categories"],
                        //         });
                        //         setName("");
                        //         setImgUrl("");
                        //         setOpenSheet(false);
                        //         setNameRequired(false);
                        //       },
                        //     }
                        //   );
                        // }}
                      >
                        Ruaj te dhenat
                      </Button> */}
                    </SheetClose>
                  </SheetFooter>
                </form>
              </SheetContent>
            </Sheet>
          </section>
        </div>
      </>
    )
  );
}
export default Reklama;
