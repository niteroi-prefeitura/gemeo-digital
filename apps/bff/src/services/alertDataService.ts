import { AlertFeature } from "../schemas/alertsSchema";
import { getAllFeatures } from "./gisService";

let cache: AlertFeature[] | null = null;
let lastFetch = 0;
const TTL = 120 * 1000;

const getAlerts = async (): Promise<AlertFeature[]> => {
  const now = Date.now();
  if (cache && now - lastFetch < TTL) {
    return cache;
  }
  const feats = (await getAllFeatures("Alerts")) as AlertFeature[];
  cache = feats;
  lastFetch = now;
  return feats;
};

export default getAlerts;
