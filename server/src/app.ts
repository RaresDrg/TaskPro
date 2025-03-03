import express from "express";
import { userRouter, boardRouter } from "./routes/api/index.js";
import {
  corsMiddleware,
  cookieParserMiddleware,
  loggerMiddleware,
  missingRouteMiddleware,
  errorMiddleware,
  jwtAuthMiddleware,
  disableCacheMiddleware,
} from "./middlewares/index.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParserMiddleware);
app.use(disableCacheMiddleware);

app.use("/api/users", userRouter);
app.use("/api/boards", jwtAuthMiddleware, boardRouter);

app.use(missingRouteMiddleware);
app.use(errorMiddleware);

export default app;
