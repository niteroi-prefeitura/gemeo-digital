import BusTrip from "../domain/BusTrip";
import buildBusDataService from "../services/busDataSevice";
import { useBusStore } from "../stores/useBusStore";
import useGraphics from "./useGraphics";

const useBusTrip = () => {
  const { busData, setBusData } = useBusStore();
  const { getAllBusesData } = buildBusDataService();
  const { createBusGraphics } = useGraphics();

  const onChangeTrips = (tripList: BusTrip[]) => {
    createBusGraphics(tripList);
    setBusData(tripList);
  };

  const fetchBusData = async () => {
    const data = await getAllBusesData();
    if (data) {
      onChangeTrips(data);
      return true;
    }
    console.log("erro ao buscar api");
    return false;
  };

  return {
    busTrips: busData,
    onChangeTrips,
    fetchBusData,
  };
};

export default useBusTrip;
