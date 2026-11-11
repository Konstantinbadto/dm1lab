export interface HealthData {
  status: "ok";
  app_name: string;
  version: string;
  environment: string;
  uptime_seconds: number;
}

export class HealthRepository {
  getHealthData(appName: string, version: string, environment: string): HealthData {
    return {
      status: "ok",
      app_name: appName,
      version,
      environment,
      uptime_seconds: Math.floor(process.uptime())
    };
  }
}
