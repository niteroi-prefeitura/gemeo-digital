import { z } from "zod";
import {
  FieldSchema,
  GeometryPropertiesSchema,
  SpatialReferenceSchema,
  UniqueIdFieldSchema,
} from "./gis";

const TrafficAttributesSchema = z.object({
  OBJECTID: z.number(),
  tx_uuid: z.string(),
  tx_pais: z.string(),
  tx_cidade: z.string(),
  tx_tipo_via: z.string(),
  tx_rua: z.string(),
  li_comprimento: z.number(),
  tx_final: z.string(),
  db_velocidade_kmh: z.number(),
  db_velocidade: z.number(),
  li_atraso: z.number(),
  li_nivel: z.number(),
  li_id: z.number(),
  dt_data_hora: z.number(),
  Shape__Length: z.number(),
});

const GeometrySchema = z.object({
  paths: z.array(z.array(z.tuple([z.number(), z.number()]))),
});

const TrafficFeatureSchema = z.object({
  attributes: TrafficAttributesSchema,
  geometry: GeometrySchema,
});

export const TrafficResponseSchema = z.object({
  objectIdFieldName: z.string(),
  uniqueIdField: UniqueIdFieldSchema,
  globalIdFieldName: z.string(),
  geometryProperties: GeometryPropertiesSchema,
  geometryType: z.string(),
  spatialReference: SpatialReferenceSchema,
  fields: z.array(FieldSchema),
  features: z.array(TrafficFeatureSchema),
});

export type TrafficResponse = z.infer<typeof TrafficResponseSchema>;
export type TrafficFeature = z.infer<typeof TrafficFeatureSchema>;
