import BusTrip from "../domain/BusTrip";
import buildBusDataService from "../services/busDataSevice";
import { useBusStore } from "../stores/useBusStore";

const useBusTrip = () => {
  const { busData, setBusData } = useBusStore();
  const { getAllBusesData } = buildBusDataService();

  const onChangeTrips = (tripList: BusTrip[]) => {
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
