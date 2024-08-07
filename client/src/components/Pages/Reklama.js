// @ts-nocheck
import React, { useState } from "react";
import { addDays, format } from "date-fns";
import Header from "../Header";
import Dashboard from "./Dashboard";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Toast as toast } from "../ui/toast";
import { cn } from "../../lib/utils";
import DatePicker from "react-datepicker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
  DialogClose,
} from "../ui/dialog";
import Alert from "../Alert";
import {
  useFetchReklama,
  useDeleteReklama,
  useSingleUser,
  useMutateUsers,
  useFetchSearchedReklama,
  useMutateReklama,
  useAddArticle,
  useAddReklama,
} from "../hooks/useFetch";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import LeftPanel from "./LeftPanel";
import useDebounce from "../../frontend/useDebounce";
import { useNavigate } from "react-router";
import AddArticle from "./AddArticle";

function FetchReklama({ loggedUser, searchTerm }) {
  const { data: reklama, isPending, error } = useFetchReklama();
  const { mutate: remove } = useDeleteReklama();
  const { mutate } = useMutateReklama();
  const [title, setTitle] = useState();
  const [partner, setPartner] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [partnerUrl, setPartnerUrl] = useState();
  const debouncedSearch = useDebounce(searchTerm, 500);
  const { data: searchReklama } = useFetchSearchedReklama(debouncedSearch);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [endsDate, setEndsDate] = useState();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return searchTerm
    ? searchReklama?.map((reklama) => {
        return (
          <TableRow key={reklama._id}>
            <TableCell className="font-medium">{reklama.title}</TableCell>

            <TableCell>
              <Select
                className="flex justify-end"
                onValueChange={(value) => {
                  let reklamaId = reklama._id;
                  mutate({
                    reklama,
                    isPublished: value,
                  });
                }}
              >
                <SelectTrigger className="flex items-center w-[170px] md:w-[280px] max-w-[480px]">
                  <SelectValue
                    placeholder={
                      reklama.isPublished ? "Published" : "Not Published"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">Not Published</SelectItem>
                  <SelectItem value="true">Published</SelectItem>
                </SelectContent>
              </Select>
            </TableCell>

            <TableCell className="text-right">
              {" "}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mr-2"
                    onClick={() => {
                      console.log(reklama.title);
                    }}
                  >
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Change Reklama</DialogTitle>
                    <DialogDescription>
                      <div className="mt-2">
                        Jeni duke ndryshuar titullin e reklames:{" "}
                        <span className="text-md text-red-600">
                          {reklama.username}
                        </span>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        autoComplete="off"
                        id="title"
                        defaultValue=""
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={() => {
                        let reklamaId = reklama._id;
                        mutate({
                          reklamaId,
                          title,
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
                alertMessage={`Deshiron ta fshish perdoruesin: "${reklama.title}" ?`}
                handleFunction={(e) => {
                  let reklamaId = reklama._id;
                  remove(reklamaId);
                }}
                alertTriggerButton={
                  <Button variant={"destructive"}> Detele </Button>
                }
              />
            </TableCell>
          </TableRow>
        );
      })
    : reklama &&
        reklama?.map((reklama) => {
          return (
            <TableRow key={reklama._id}>
              <TableCell className="font-medium">{reklama.title}</TableCell>
              <TableCell>
                <img src={reklama.imgUrl} className="w-64" />
              </TableCell>
              <TableCell>{reklama.partner}</TableCell>
              <TableCell>
                <Select
                  className="flex justify-end"
                  onValueChange={(value) => {
                    let reklamaId = reklama._id;
                    mutate({
                      reklamaId,
                      isPublished: value,
                    });
                  }}
                >
                  <SelectTrigger className="flex items-center w-[170px]">
                    <SelectValue
                      placeholder={
                        reklama.isPublished ? "Published" : "Not Published"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Not Published</SelectItem>
                    <SelectItem value="true">Published</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              {/* Starts at */}
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {reklama?.startsAt ? (
                        format(reklama.startsAt, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <div className="flex items-center">
                      <div className="rounded-md border items-center flex flex-col">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                        <div className="flex items-center mb-2">
                          <button
                            className="border bg-green-500 text-center px-3 py-2 hover:bg-green-600"
                            onClick={(value) => {
                              let reklamaId = reklama._id;
                              setDate(addDays(new Date(), parseInt(value)));
                              mutate({
                                reklamaId,
                                startsAt: date,
                              });
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              {/* Ends at */}
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {reklama?.endsAt ? (
                        format(reklama.endsAt, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                    <div className="flex items-center">
                      <div className="rounded-md border items-center flex flex-col">
                        <Calendar
                          mode="single"
                          selected={endsDate}
                          onSelect={setEndsDate}
                        />
                        <div className="flex items-center mb-2">
                          <button
                            className="border bg-green-500 text-center px-3 py-2 hover:bg-green-600"
                            onClick={(value) => {
                              let reklamaId = reklama._id;
                              setDate(addDays(new Date(), parseInt(value)));
                              mutate({
                                reklamaId,
                                endsAt: endsDate,
                              });
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
              <TableCell className="text-right">
                {" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="mr-2"
                      onClick={() => {
                        setTitle(reklama.title);
                        setPartner(reklama.partner);
                        setImgUrl(reklama.imgUrl);
                      }}
                    >
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Change Ads Data</DialogTitle>
                      <DialogDescription>
                        <div className="mt-2">
                          Jeni duke ndryshuar titullin per reklamen:{" "}
                          <span className="text-md text-red-600">
                            {reklama.title}
                          </span>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          autoComplete="off"
                          id="title"
                          defaultValue={reklama.title}
                          onChange={(e) => {
                            if (e.target.value.length > 0) {
                              setTitle(e.target.value);
                            }
                          }}
                          className="col-span-3"
                        />
                        <Label htmlFor="img" className="text-right">
                          Image
                        </Label>
                        <Input
                          id="img"
                          defaultValue={reklama.imgUrl}
                          onChange={(e) => {
                            setImgUrl(e.target.value);
                          }}
                          className="col-span-3"
                        />
                        <Label htmlFor="partner" className="text-right">
                          Partner
                        </Label>
                        <Input
                          autoComplete="off"
                          id="partner"
                          defaultValue={reklama.partner}
                          onChange={(e) => {
                            if (e.target.value.length > 0) {
                              setPartner(e.target.value);
                            }
                          }}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => {
                          let reklamaId = reklama._id;
                          mutate(
                            {
                              reklamaId,
                              title,
                              partner: partner,
                              imgUrl,
                            },
                            {
                              onSuccess: () => {
                                // setTitle("");
                                // setPartner("");
                                // setOpen(false);
                              },
                            }
                          );
                        }}
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Alert
                  alertTitle={"Po fshin perdoruesin"}
                  alertMessage={`Deshiron ta fshish perdoruesin: "${reklama.title}" ?`}
                  handleFunction={(e) => {
                    let reklamaId = reklama._id;
                    remove(reklamaId);
                  }}
                  alertTriggerButton={
                    <Button variant={"destructive"}> Detele </Button>
                  }
                />
              </TableCell>
            </TableRow>
          );
        });
}

function AddNewReklama() {
  const { mutate: addReklama } = useAddReklama();
  let [title, setTitle] = useState();
  let [imgUrl, setImgUrl] = useState();
  let [open, setOpen] = useState(false);
  let handleCreate = () => {
    addReklama(
      {
        title,
        imgUrl,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mr-2">
          Create New Ad
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Ads Data</DialogTitle>
          <DialogDescription>
            <div className="mt-2">
              Jeni duke krijuar nje reklame te re!
              {/* <span className="text-md text-red-600">{reklama.title}</span> */}
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              autoComplete="off"
              id="title"
              defaultValue=""
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className="col-span-3"
            />
            <Label htmlFor="img" className="text-right">
              Image
            </Label>
            <Input
              id="img"
              defaultValue=""
              onChange={(e) => {
                setImgUrl(e.target.value);
              }}
              className="col-span-3"
            />
            <Label htmlFor="partner" className="text-right">
              Partner
            </Label>
            <Input
              autoComplete="off"
              id="partner"
              onChange={(e) => {
                if (e.target.value.length > 0) {
                  // setPartner(e.target.value);
                }
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleCreate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function Reklama() {
  let { data: loggedUser } = useSingleUser();
  const [searchTerm, setSearchTerm] = useState();
  const [title, setTitle] = useState();
  const [imgUrl, setImgUrl] = useState();

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
            Ads
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
                        <div className="flex mx-auto text-purple-700 dark:text-purple-300 group hover:ring ring-purple-300">
                          <input
                            type="search"
                            id="search__input"
                            onChange={handleSearch}
                            className=" border-purple-600 w-full bg-white dark:bg-neutral-900 focus:ring-opacity-70 p-1 border border-opacity-30 focus:outline-none focus:ring focus:ring-purple-600"
                            placeholder="Title"
                          />
                        </div>
                      </div>
                    </TableHead>
                    <TableHead className="text-center">Image</TableHead>
                    <TableHead className="text-center">Partner</TableHead>
                    <TableHead className="text-center">Published?</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <FetchReklama
                    loggedUser={loggedUser}
                    searchTerm={searchTerm}
                  />
                </TableBody>
              </Table>
              <AddNewReklama />
            </section>
          </div>
        </div>
      </>
    )
  );
}

export default Reklama;
