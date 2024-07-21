// @ts-nocheck
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
  useMutation,
  useMutationState,
  useQuery,
} from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";
import { useToast } from "../ui/use-toast";

import { Link, useSearchParams, useNavigate } from "react-router-dom";

// Fetch All Articles
const fetchArticles = async (currentPage) => {
  return await apiClient.get(`news/all?p=${currentPage}`);
};
// Fetch All Articles
export const useFetchArticles = (currentPage) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchArticles(currentPage);
      return data;
    },
    queryKey: ["articles", { currentPage }],
  });
};

// Fetch Published Articles
const fetchPublishedArticles = async (currentPage) => {
  return await apiClient.get(`news/?p=${currentPage}`);
};

// Fetch Published Articles
export const useFetchPublishedArticles = (currentPage) => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchPublishedArticles(currentPage);
      return data;
    },
    queryKey: ["published articles", { currentPage }],
  });
};

// Fetch Highlighted Articles
const fetchHighlightedArticles = async () => {
  return await apiClient.get(`news/top`);
};

// Fetch Highlighted Articles
export const useFetchHighlightedArticles = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchHighlightedArticles();
      return data;
    },
    queryKey: ["highlighted articles"],
  });
};
// Fetch 1 Highlighted Articles
const fetchHighlightedArticle = async () => {
  return await apiClient.get(`news/top1`);
};

// Fetch 1 Highlighted Articles
export const useFetchHighlightedArticle = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchHighlightedArticle();
      return data;
    },
    queryKey: ["highlighted article"],
  });
};
// Fetch Single Article
const fetchSingleArticle = async (id) => {
  return await apiClient.get(`/news/${id}`);
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
  return await apiClient.post("/news/", article);
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
        navigate("/dashboard");
      }, 5000);
    },
  });
};
//Mutate Article
const mutateSingleArticle = async (id) => {
  let {
    title,
    isPublished,
    isHighlighted,
    category,
    description,
    author,
    content,
    sourceUrl,
  } = id;
  return await apiClient.patch(`/news/${id.articleId}`, {
    title,
    category,
    description,
    content,
    author,
    sourceUrl,
    isPublished,
    isHighlighted,
  });
};
// Mutate Article
export const useMutateArticle = (article) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single article"],
    mutationFn: mutateSingleArticle,
    onSuccess: async () => {
      // queryClient.invalidateQueries({ queryKey: ["articles"] });
      return await queryClient.invalidateQueries({
        queryKey: ["single article"],
        // queryKey: ["published articles"],
      });
    },
  });
};

//Delete Article
const deleteSingleArticle = async (id) => {
  return await apiClient.delete(`/news/${id}`);
};
// Delete Article
export const useDeleteArticle = (id) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single article"],
    mutationFn: deleteSingleArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
};

// Categories
// Fetch All Categoris

const fetchCategories = async () => {
  return await apiClient.get(`categories/`);
};
// Fetch All Categories
export const useFetchCategories = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchCategories();
      return data;
    },
    queryKey: ["categories"],
  });
};

// Fetch Single Category
const fetchSingleCategory = async (id) => {
  return await apiClient.get(`/categories/${id}`);
};
// Fetch Single Category
export const useSingleCategory = () => {
  const [queryParameter] = useSearchParams();
  let id = queryParameter.get("id");

  return useQuery({
    queryFn: async () => {
      const { data } = await fetchSingleCategory(id);
      return data;
    },
    queryKey: ["single category", id],
  });
};

//Add Category
const addCategory = async (category) => {
  return await apiClient.post("/categories/", category);
};
export const useAddCategory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: addCategory,
    mutationKey: ["single category"],
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Success",
        description: "Artikulli u krijua me sukses!",
      });
      // setTimeout(() => {
      //   navigate("/");
      // }, 5000);
    },
  });
};

// //Mutate Category
// const useMutateSingleCategory = async (category) => {
//   let { name, imgUrl } = category;

//   return await apiClient.patch(`/categories/${id._id}`, {
//     name,
//     imgUrl,
//   });
// };
// // Mutate Category
// export const useMutateCategory = (id) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationKey: ["single category"],
//     mutationFn: useMutateSingleCategory,
//     onSuccess: async (id) => {
//       // queryClient.invalidateQueries({ queryKey: ["articles"] });
//       return await queryClient.invalidateQueries({
//         queryKey: ["single category"],
//       });
//     },
//   });
// };

//Mutate Category
const useMutateSingleCategory = async (category) => {
  let { name, imgUrl } = category;
  return await apiClient.patch(`/categories/${category.id}`, {
    name,
    imgUrl,
  });
};
// Mutate Category
export const useMutateCategory = (category) => {
  // const [queryParameter] = useSearchParams();
  // let id = queryParameter.get("id");
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["single category"],
    mutationFn: useMutateSingleCategory,
    onSuccess: async (id) => {
      // queryClient.invalidateQueries({ queryKey: ["articles"] });
      return await queryClient.invalidateQueries({
        queryKey: ["single category"],
      });
    },
    onSettled: (category) => {
      console.log(category.data);
    },
  });
};
