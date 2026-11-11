import dotenv from "dotenv";

dotenv.config();

function readPort(value: string | undefined): number {
  const port = Number(value ?? 8080);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }
  return port;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: readPort(process.env.PORT),
  appName: process.env.APP_NAME ?? "collection-tracker",
  appVersion: process.env.APP_VERSION ?? "1.0.0"
};
