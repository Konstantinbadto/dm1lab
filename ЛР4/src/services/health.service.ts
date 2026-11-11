import { env } from "../config/env";
import { HealthRepository } from "../repositories/health.repository";

export class HealthService {
  constructor(private readonly repository = new HealthRepository()) {}

  getHealth() {
    return this.repository.getHealthData(
      env.appName,
      env.appVersion,
      env.nodeEnv
    );
  }
}
