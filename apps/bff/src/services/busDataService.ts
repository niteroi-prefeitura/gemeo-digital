import axios from "axios";
import { BusMapSchema, Trip } from "../schemas/busSchema";
import tripParser from "../lib/busParser";
import { env } from "../config/env";

let cache: Trip[] | null = null;
let lastFetch = 0;
const TTL = 30 * 1000;

export const getBusData = async (): Promise<Trip[]> => {
  const now = Date.now();
  if (cache && now - lastFetch < TTL) {
    return cache;
  }

  const response = await axios.get(env.BUS_API);
  const parsedBusMap = BusMapSchema.parse(response.data);
  const parsedTripList = tripParser(parsedBusMap);

  cache = parsedTripList;
  lastFetch = now;
  return parsedTripList;
};
