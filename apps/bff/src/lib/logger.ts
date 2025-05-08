import { createLogger, format, transports } from "winston";
import path from "path";

const { combine, timestamp, printf, colorize, json } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
  transports: [
    new transports.Console({
      format: combine(colorize(), logFormat),
    }),

    new transports.File({
      filename: path.resolve("logs/error.log"),
      level: "error",
    }),
  ],
});
