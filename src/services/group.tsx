import axios from "@/services/axios-config";
import type { AxiosResponse } from "axios";

const getAllGroup = (): Promise<AxiosResponse> => {
  return axios.get("/api/group/read");
};

export { getAllGroup };
