import express from "express";
import cors from "cors";
import helmet from "helmet";
import healthRouter from "./routes/health.routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_request, response) => {
  response.status(200).json({
    message: "Collection Tracker API",
    health: "/api/v1/health"
  });
});

app.use("/api/v1/health", healthRouter);

app.use((_request, response) => {
  response.status(404).json({
    error: "Not Found",
    message: "The requested endpoint does not exist"
  });
});

export default app;
