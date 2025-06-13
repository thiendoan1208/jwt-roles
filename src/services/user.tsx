import axios from "@/services/axios-config";
import type { SignInForm, SignUpForm } from "@/types/form";

const createNewUser = (signUpForm: SignUpForm) => {
  return axios.post("/api/users/create-user", signUpForm);
};

const signInUser = (signInForm: SignInForm) => {
  return axios.post("/api/users/sign-in", signInForm);
};

export { createNewUser, signInUser };
