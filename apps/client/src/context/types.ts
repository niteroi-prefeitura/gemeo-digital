import { Dispatch, ReactNode, SetStateAction } from "react";
import BusTrip from "../domain/BusTrip";

export type BusTripsState = {
  busTrips: {
    allData: BusTrip[] | null;
    setAllData: Dispatch<SetStateAction<BusTrip[] | null>>;
  };
  loading: {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };
};

export type ProviderProps = {
  children?: ReactNode;
};
