import axios from "axios";
import { Process } from "../contexts/dialogContext";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

const baseUrl = "http://localhost:3333/api";
