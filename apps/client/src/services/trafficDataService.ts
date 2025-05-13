import { TrafficFeature } from "@gdn/shared";
import { buildAxiosService } from "./axiosService";

const buildTrafficDataSerivce = () => {
  const http = buildAxiosService();

  const getTrafficFeatures = async (): Promise<TrafficFeature[]> => {
    try {
      const response = await http.get("/api/traffic");
      return response.data as TrafficFeature[];
    } catch {
      console.log("erro ao buscar dados na api");
      return [];
    }
  };

  return {
    getTrafficFeatures,
  };
};

export default buildTrafficDataSerivce;
