import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";
export async function loginUser(dataSubmit) {
  const request = await axios
    .post("/api/users/login", dataSubmit)
    .then((response) => response.data);

  return {
    type: "LOGIN_USER",
    payload: request,
  };
}

export function registerUser(dataSubmit) {
  const request = axios
    .post("/api/users/register", dataSubmit)
    .then((response) => response.data);

  return {
    type: "REGISTER_USER",
    payload: request,
  };
}

export function authUser() {
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    type: "AUTH_USER",
    payload: request,
  };
}
