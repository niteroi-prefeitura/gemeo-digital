import { useContext } from "react";
import { TrafficFeaturesContext } from "../context/traffic";
import buildTrafficDataSerivce from "../services/trafficDataService";
import { TrafficFeature } from "@gdn/shared";

const useTraffic = () => {
  const context = useContext(TrafficFeaturesContext);
  const { getTrafficFeatures } = buildTrafficDataSerivce();

  const onChangeTraffic = (trafficList: TrafficFeature[]) => {
    context?.features.setAllData(trafficList);
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
    trafficData: context?.features.data || [],
    onChangeTraffic,
  };
};

export default useTraffic;
