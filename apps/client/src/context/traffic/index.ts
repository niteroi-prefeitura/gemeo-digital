import { createContext } from "react";
import { TrafficFeaturesState } from "./types";

export const TrafficFeaturesContext =
  createContext<TrafficFeaturesState | null>(null);
