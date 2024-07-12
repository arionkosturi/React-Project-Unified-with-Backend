import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3344/news",
  headers: {
    "Content-Type": "application/json",
  },
});
