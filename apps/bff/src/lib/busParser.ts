import { stringNormalizerLower } from "../utils/normalizer";
import { BusMap, SingleTripSchema, Trip } from "@gdn/shared";

const tripParser = (apiData: BusMap): Trip[] => {
  const tripList = Object.values(apiData);
  return tripList.map((trip) => {
    return SingleTripSchema.parse({
      id: trip.tripId,
      routeId: trip.routeId,
      currentLocation: {
        latitude: trip.lat,
        longitude: trip.lng,
        angle: trip.angle,
      },
      destination: stringNormalizerLower(trip.sentido),
      busInfo: {
        consortium: stringNormalizerLower(trip.consorcio),
        busLine: stringNormalizerLower(trip.linha),
        busLineName: stringNormalizerLower(trip.nomeLinha),
        headsign: stringNormalizerLower(trip.headsign),
        shapeId: trip.shapeId,
      },
    });
  });
};

export default tripParser;
