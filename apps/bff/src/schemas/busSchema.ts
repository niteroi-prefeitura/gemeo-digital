import { z } from "zod";

export const SingleBusSchema = z.object({
  tripId: z.string(),
  routeId: z.string(),
  lat: z.number(),
  lng: z.number(),
  angle: z.number(),
  consorcio: z.string().nullable(),
  linha: z.string().nullable(),
  nomeLinha: z.string().nullable(),
  headsign: z.string().nullable(),
  shapeId: z.string().nullable(),
  sentido: z.string().nullable(),
});

export const BusMapSchema = z.record(SingleBusSchema);

export type Bus = z.infer<typeof SingleBusSchema>;
export type BusMap = z.infer<typeof BusMapSchema>;

export const TripLocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  angle: z.number(),
  timestamp: z.date().default(() => new Date()),
});

export type TripLocation = z.infer<typeof TripLocationSchema>;

export const TripBusInfoSchema = z.object({
  consortium: z.string().nullable(),
  busLine: z.string().nullable(),
  busLineName: z.string().nullable(),
  headsign: z.string().nullable(),
  shapeId: z.string().nullable(),
});

export type TripBusInfo = z.infer<typeof TripBusInfoSchema>;

export const SingleTripSchema = z.object({
  id: z.string(),
  routeId: z.string(),
  currentLocation: TripLocationSchema,
  destination: z.string().nullable(),
  busInfo: TripBusInfoSchema,
});

export type Trip = z.infer<typeof SingleTripSchema>;
