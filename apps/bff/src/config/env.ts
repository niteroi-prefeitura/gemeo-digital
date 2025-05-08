import "dotenv/config";

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Variável não encontrada: ${key}`);
  return value;
}

export const env = {
  PORT: getEnv("PORT"),
  BUS_API: getEnv("BUS_API"),
  ALERTS_LAYER_URL: getEnv("ALERTS_LAYER_URL"),
  TRAFFIC_LAYER_URL: getEnv("TRAFFIC_LAYER_URL"),
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
