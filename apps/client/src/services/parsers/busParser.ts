import BusTrip from "../../domain/BusTrip";
import { Trip } from "../../schemas/busSchema";

const busParser = (apiData: Trip[]) => {
  const tripList = Object.values(apiData);
  return tripList.map((trip) => {
    return new BusTrip({
      id: trip.id,
      routeId: trip.routeId,
      currentLocation: trip.currentLocation,
      destination: trip.destination,
      busInfo: trip.busInfo,
    });
  });
};

export default busParser;
