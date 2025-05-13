import { TrafficFeature } from "@gdn/shared";
import { useState } from "react";
import { TrafficFeaturesContext } from ".";
import { ProviderProps } from "./types";

export const TrafficFeaturesProvider = ({ children }: ProviderProps) => {
  const [trafficFeaturesData, setTrafficFeaturesData] = useState<
    TrafficFeature[] | null
  >(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <TrafficFeaturesContext.Provider
      value={{
        features: {
          data: trafficFeaturesData,
          setAllData: setTrafficFeaturesData,
        },
        loading: {
          isLoading,
          setIsLoading,
        },
      }}
    >
      {children}
    </TrafficFeaturesContext.Provider>
  );
};
