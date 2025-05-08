import { useContext } from "react";
import { BusTripsContext } from "../context";
import BusTrip from "../domain/BusTrip";
import buildBusDataService from "../services/busDataSevice";

const useBusTrip = () => {
  const context = useContext(BusTripsContext);
  const { getAllBusesData } = buildBusDataService();

  const onChangeTrips = (tripList: BusTrip[]) => {
    context?.busTrips.setAllData(tripList);
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
    busTrips: context?.busTrips.allData || [],
    onChangeTrips,
    fetchBusData,
  };
};

export default useBusTrip;
