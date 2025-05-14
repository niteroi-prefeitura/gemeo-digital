import { create } from "zustand";
import { TrafficFeature } from "@gdn/shared";

type TrafficStore = {
  trafficData: TrafficFeature[];
  setTrafficData: (trafficData: TrafficFeature[]) => void;
};

export const useTrafficStore = create<TrafficStore>((set) => ({
  trafficData: [],
  setTrafficData: (trafficData) => set({ trafficData }),
}));
