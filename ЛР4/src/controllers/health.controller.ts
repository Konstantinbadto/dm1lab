import { Request, Response } from "express";
import { HealthService } from "../services/health.service";

const healthService = new HealthService();

export function getHealth(_request: Request, response: Response): void {
  response.status(200).json(healthService.getHealth());
}
