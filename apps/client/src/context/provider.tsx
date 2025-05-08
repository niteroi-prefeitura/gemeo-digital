import { useState } from "react";
import { BusTripsContext } from ".";
import { ProviderProps } from "./types";
import BusTrip from "../domain/BusTrip";

export const BusTripsProvider = ({ children }: ProviderProps) => {
  const [busTripsData, setBusTripsData] = useState<BusTrip[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <BusTripsContext.Provider
      value={{
        busTrips: {
          allData: busTripsData,
          setAllData: setBusTripsData,
        },
        loading: {
          isLoading,
          setIsLoading,
        },
      }}
    >
      {children}
    </BusTripsContext.Provider>
  );
};
