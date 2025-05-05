import axios from "axios";
import { AUTH_API_URL } from "../../consts";

export const authApi = axios.create({
  baseURL: AUTH_API_URL,
});
