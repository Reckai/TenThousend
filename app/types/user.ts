import { LoginResponse } from "../api/axios/auth/requests";

export type User = Pick<
  LoginResponse,
  "id" | "username" | "email" | "firstName" | "lastName" | "gender" | "image"
>;
