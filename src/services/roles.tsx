import axios from "@/services/axios-config";

const createRoles = (roles: object[]) => {
  return axios.post("/api/role/create", roles);
};

export { createRoles };
