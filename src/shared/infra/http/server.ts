import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "./routes";
import "@shared/container";
import * as Sentry from "@sentry/node";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

Sentry.init({
  dsn: `https://${process.env.SENTRY_KEY}.ingest.sentry.io/${process.env.SENTRY_PROJECT}`,
  tracesSampleRate: 1.0,
});

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    return response.status(500).json({
      status: "error",
      message: err.message,
    });
  }
);

app.listen(3333, () => {
  console.log("Server is running on http://localhost:3333");
});
