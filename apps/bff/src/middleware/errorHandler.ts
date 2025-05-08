import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../lib/logger";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _: NextFunction
) {
  logger.error(`❌ ${req.method} ${req.url} - ${(err as Error).message}`);

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: "Erro de validação nos dados recebidos",
      details: err.format(),
    });
  }

  return res.status(500).json({
    error: "Erro interno do servidor",
    message: err instanceof Error ? err.message : "Erro desconhecido",
  });
}
