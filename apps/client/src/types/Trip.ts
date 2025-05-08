export interface Trip {
  tripId: string;
  routeId: string;
  lat: number;
  lng: number;
  angle: number;
  consorcio: string;
  linha: string;
  nomeLinha: string;
  headsign: string;
  shapeId: string;
  sentido: "Ida" | "Volta";
}

export type TripDataObject = Record<string, Trip>;
