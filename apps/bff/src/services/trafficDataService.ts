import { TrafficFeature } from "@gdn/shared";
import { getAllFeatures } from "./gisService";

let cache: TrafficFeature[] | null = null;
let lastFetch = 0;
const TTL = 300 * 1000;

const getTrafficLines = async (): Promise<TrafficFeature[]> => {
  const now = Date.now();
  if (cache && now - lastFetch < TTL) {
    return cache;
  }
  const feats = (await getAllFeatures("Traffic")) as TrafficFeature[];
  cache = feats;
  lastFetch = now;
  return feats;
};

export default getTrafficLines;
