import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/apiClient";

const fetchArticles = async () => {
  return await apiClient.get("/");
};

export const useFetchArticles = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await fetchArticles();
      return data;
    },
    queryKey: ["articles"],
  });
};
