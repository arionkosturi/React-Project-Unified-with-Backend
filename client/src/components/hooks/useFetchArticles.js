// @ts-nocheck
import { useMutation, useMutationState, useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import { useToast } from "../ui/use-toast";

import { Link, useSearchParams, useNavigate } from "react-router-dom";

// Fetch All Articles
const fetchArticles = async (currentPage) => {
  return await apiClient.get(`/all?p=${currentPage}`);
};
// Fetch All Articles
export const useFetchArticles = (currentPage) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchArticles(currentPage);
      return data;
    },
    queryKey: ["all articles", { currentPage }],
    keepPreviousData: true,
  });
};

// Fetch Published Articles
const fetchPublishedArticles = async () => {
  return await apiClient.get("/");
};

// Fetch Published Articles
export const useFetchPublishedArticles = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchPublishedArticles();
      return data[0];
    },
    queryKey: ["published articles"],
  });
};

// Fetch Single Article
const fetchSingleArticle = async (id) => {
  return await apiClient.get(id);
};
// Fetch Single Article
export const useSingleArticle = () => {
  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");

  return useQuery({
    queryFn: async () => {
      const { data } = await fetchSingleArticle(id);
      return data;
    },
    queryKey: ["single article", id],
  });
};

//Add Article
const addArticle = async (article) => {
  return await apiClient.post("/", article);
};
export const useAddArticle = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addArticle,
    mutationKey: ["single article"],
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Artikulli u krijua me sukses!",
      });
      setTimeout(() => {
        navigate("/");
      }, 5000);
    },
  });
};
//Mutate Article
const mutateSingleArticle = async (id) => {
  console.log(id.id);
  return await apiClient.patch(`${id.id}`);
};
// Mutate Article
export const useMutateArticle = (id, article) => {
  // const [queryParameter] = useSearchParams();
  // let id = queryParameter.get("id");

  return useMutation({
    mutationFn: mutateSingleArticle,
    mutationKey: ["single article"],
  });
};
