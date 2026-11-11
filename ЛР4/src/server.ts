import app from "./app";
import { env } from "./config/env";

const server = app.listen(env.port, () => {
  console.log(`${env.appName} is running in ${env.nodeEnv} mode`);
  console.log(`Health check: http://localhost:${env.port}/api/v1/health`);
});

function shutdown(signal: string): void {
  console.log(`${signal} received. Shutting down gracefully...`);
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
