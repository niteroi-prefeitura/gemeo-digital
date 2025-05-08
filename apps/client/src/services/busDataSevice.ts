import { Trip } from "@gdn/shared";
import { buildAxiosService } from "./axiosService";
import busParser from "./parsers/busParser";

const buildBusDataService = () => {
  const http = buildAxiosService();

  const getAllBusesData = async () => {
    try {
      const response = await http.get("/api/bus");
      return busParser(response.data as Trip[]);
    } catch {
      console.log("erro ao buscar dados na api");
    }
  };

  return {
    getAllBusesData,
  };
};

export default buildBusDataService;
