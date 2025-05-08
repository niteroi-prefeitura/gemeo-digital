import { z } from "zod";
import {
  FieldSchema,
  GeometrySchema,
  SpatialReferenceSchema,
  UniqueIdFieldSchema,
} from "./gis";

const AlertAttributesSchema = z.object({
  OBJECTID: z.number(),
  tx_uuid: z.string().uuid(),
  tx_rua: z.string(),
  tx_tipo_via: z.string(),
  tx_tipo_alerta: z.string(),
  tx_subtipo_alerta: z.string(),
  tx_informe_municipal: z
    .union([z.literal("true"), z.literal("false")])
    .transform((val) => val === "true"),
  dt_data_hora: z.number(),
  dt_entrada: z.number(),
  dt_saida: z.number().nullable(),
  db_lat: z.number(),
  db_long: z.number(),
  li_avaliacao_informe: z.number(),
  li_confianca: z.number(),
  li_confiabilidade: z.number(),
  li_direcao_graus: z.number(),
});

const AlertsFeatureSchema = z.object({
  attributes: AlertAttributesSchema,
  geometry: GeometrySchema,
});

export const AlertsResponseSchema = z.object({
  objectIdFieldName: z.string(),
  uniqueIdField: UniqueIdFieldSchema,
  globalIdFieldName: z.string(),
  geometryType: z.string(),
  spatialReference: SpatialReferenceSchema,
  fields: z.array(FieldSchema),
  features: z.array(AlertsFeatureSchema),
});

export type AlertsResponse = z.infer<typeof AlertsResponseSchema>;
export type AlertFeature = z.infer<typeof AlertsFeatureSchema>;
