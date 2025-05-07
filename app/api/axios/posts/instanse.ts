import axios from "axios";
import { DUMMY_API_URL } from "../../consts";

export const dummyApi = axios.create({
  baseURL: DUMMY_API_URL,
});
