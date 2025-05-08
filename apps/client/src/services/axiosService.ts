import axios, { AxiosResponse } from "axios";

type ConfigCall = {
  params?: URLSearchParams;
};

type AxiosServiceProtocol = {
  get: <T>(path: string, config?: ConfigCall) => Promise<AxiosResponse<T>>;
};

export const buildAxiosService = (): AxiosServiceProtocol => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const get = <T>(
    path: string,
    config?: ConfigCall
  ): Promise<AxiosResponse<T>> => axiosInstance.get(path, config);

  return {
    get,
  };
};
