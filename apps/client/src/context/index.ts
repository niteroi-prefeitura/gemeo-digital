import { createContext } from "react";
import { BusTripsState } from "./types";

export const BusTripsContext = createContext<BusTripsState | null>(null);
