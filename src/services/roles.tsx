import axios from "@/services/axios-config";

const createRoles = (roles: object[]) => {
  return axios.post("/api/role/create", roles);
};

const getAllRoles = () => {
  return axios.get("/api/role/list");
};

const deleteRole = (roleID: number) => {
  return axios.delete("/api/role/delete", { params: { roleID } });
};

export { createRoles, getAllRoles, deleteRole };
