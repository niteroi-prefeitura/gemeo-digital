import { request } from "@esri/arcgis-rest-request";
import { env } from "../config/env";
import { AlertFeature, AlertsResponseSchema } from "@gdn/shared";
import { TrafficFeature, TrafficResponseSchema } from "@gdn/shared";

type FeatureTypeOptions = "Alerts" | "Traffic";

export const getAllFeatures = async (
  featureType: FeatureTypeOptions
): Promise<AlertFeature[] | TrafficFeature[]> => {
  const layerUrl =
    featureType === "Alerts" ? env.ALERTS_LAYER_URL : env.TRAFFIC_LAYER_URL;
  const query = `${layerUrl}/query`;
  const params = {
    where: "1=1",
    outFields: "*",
    f: "json",
  };

  const response = await request(query, { params });
  if (featureType === "Alerts") {
    const parsedResponse = AlertsResponseSchema.parse(response);
    return parsedResponse.features;
  }
  const parsedResponse = TrafficResponseSchema.parse(response);
  return parsedResponse.features;
};
