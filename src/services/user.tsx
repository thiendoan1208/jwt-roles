import axios from "@/services/axios-config";
import type { SignUpForm } from "@/types/form";

const createNewUser = async (signUpForm: SignUpForm) => {
  return axios.post("/api/users/create-user", signUpForm);
};

export { createNewUser };
