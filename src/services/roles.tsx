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

const getRolesByGroup = (groupID: string) => {
  return axios.get(`/api/role/group-roles/${groupID}`);
};

const assignRoleToGroup = (
  groupInfo: { groupID: number; roleID: number }[]
) => {
  return axios.post("/api/role/assign-role-group", groupInfo);
};

export {
  createRoles,
  getAllRoles,
  deleteRole,
  getRolesByGroup,
  assignRoleToGroup,
};
