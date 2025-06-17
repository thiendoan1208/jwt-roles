import axios from "@/services/axios-config";
import type { CreateUserForm, SignInForm, SignUpForm } from "@/types/form";
import type { AxiosResponse } from "axios";

const signUpUser = (signUpForm: SignUpForm) => {
  return axios.post("/api/users/create-user", signUpForm);
};

const signInUser = (signInForm: SignInForm) => {
  return axios.post("/api/users/sign-in", signInForm);
};

// CRUD User

const getAllUsers = (
  currentPage: number,
  PAGE_LIMIT: number,
  signal: AbortSignal
): Promise<AxiosResponse> => {
  return axios.get(`/api/user/list?page=${currentPage}&limit=${PAGE_LIMIT}`, {
    signal,
  });
};

const createNewUser = (user: CreateUserForm): Promise<AxiosResponse> => {
  return axios.post("/api/user/create", user);
};

const deleteUser = (id: number): Promise<AxiosResponse> => {
  return axios.delete("/api/user/delete", { params: { id: id } });
};

export { signUpUser, signInUser, getAllUsers, deleteUser, createNewUser };
