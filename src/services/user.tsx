import axios from "@/services/axios-config";
import type { SignInForm, SignUpForm } from "@/types/form";
import type { AxiosResponse } from "axios";

const createNewUser = (signUpForm: SignUpForm) => {
  return axios.post("/api/users/create-user", signUpForm);
};

const signInUser = (signInForm: SignInForm) => {
  return axios.post("/api/users/sign-in", signInForm);
};

const getAllUsers = (
  currentPage: number,
  PAGE_LIMIT: number,
  signal: AbortSignal
): Promise<AxiosResponse> => {
  return axios.get(`/api/user/list?page=${currentPage}&limit=${PAGE_LIMIT}`, {
    signal,
  });
};

const deleteUser = (id: number): Promise<AxiosResponse> => {
  return axios.delete("/api/user/delete", { params: { id: id } });
};

export { createNewUser, signInUser, getAllUsers, deleteUser };
