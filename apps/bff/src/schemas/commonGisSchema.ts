import { z } from "zod";

export const UniqueIdFieldSchema = z.object({
  name: z.string(),
  isSystemMaintained: z.boolean(),
});

export const GeometryPropertiesSchema = z.object({
  shapeLengthFieldName: z.string(),
  units: z.string(),
});

export const SpatialReferenceSchema = z.object({
  wkid: z.number(),
  latestWkid: z.number(),
});

export const FieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  alias: z.string(),
  sqlType: z.string(),
  length: z.number().optional(),
  domain: z.null(),
  defaultValue: z.null(),
});

export const GeometrySchema = z.object({
  x: z.number(),
  y: z.number(),
});
