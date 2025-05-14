import buildTrafficDataSerivce from "../services/trafficDataService";
import { TrafficFeature } from "@gdn/shared";
import { useTrafficStore } from "../stores/useTrafficStore";

const useTraffic = () => {
  const { trafficData, setTrafficData } = useTrafficStore();
  const { getTrafficFeatures } = buildTrafficDataSerivce();

  const onChangeTraffic = (trafficList: TrafficFeature[]) => {
    setTrafficData(trafficList);
  };

  const fetchTrafficData = async () => {
    const data = await getTrafficFeatures();
    if (data) {
      onChangeTraffic(data);
      return true;
    }
    console.log("erro ao buscar api");
    return false;
  };

  return {
    fetchTrafficData,
    trafficData: trafficData,
    onChangeTraffic,
  };
};

export default useTraffic;
