import axios from "@/services/axios-config";
import type { SignInForm, SignUpForm } from "@/types/form";
import type { AxiosResponse } from "axios";

const createNewUser = (signUpForm: SignUpForm) => {
  return axios.post("/api/users/create-user", signUpForm);
};

const signInUser = (signInForm: SignInForm) => {
  return axios.post("/api/users/sign-in", signInForm);
};

const getAllUsers = (signal: AbortSignal): Promise<AxiosResponse> => {
  return axios.get("/api/user/list", { signal });
};

export { createNewUser, signInUser, getAllUsers };
