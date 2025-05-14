import { create } from "zustand";
import BusTrip from "../domain/BusTrip";

type BusStore = {
  busData: BusTrip[];
  setBusData: (busData: BusTrip[]) => void;
};

export const useBusStore = create<BusStore>((set) => ({
  busData: [],
  setBusData: (busData) => set({ busData }),
}));
