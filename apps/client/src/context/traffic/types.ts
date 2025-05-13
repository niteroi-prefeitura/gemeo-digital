import { TrafficFeature } from "@gdn/shared";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type TrafficFeaturesState = {
  features: {
    data: TrafficFeature[] | null;
    setAllData: Dispatch<SetStateAction<TrafficFeature[] | null>>;
  };
  loading: {
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  };
};

export type ProviderProps = {
  children?: ReactNode;
};
