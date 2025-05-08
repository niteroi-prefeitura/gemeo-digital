import express, { Application, ErrorRequestHandler } from "express";
import cors from "cors";
import busRoutes from "./routes/busRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { env } from "./config/env";
import { logger } from "./lib/logger";
import alertsRoutes from "./routes/alertsRoutes";
import trafficRoutes from "./routes/trafficRoutes";

const app: Application = express();
const PORT = env.PORT;

app.use(cors());

app.use("/api/bus", busRoutes);

app.use("/api/alerts", alertsRoutes);

app.use("/api/traffic", trafficRoutes);

app.use(errorHandler as unknown as ErrorRequestHandler);

app.listen(PORT, () => {
  logger.info(`Servidor rodando em http://localhost:${PORT}`);
});

export default app;
