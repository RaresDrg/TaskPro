import express from "express";
import { userRouter } from "./routes/api/index.js";
import {
  corsMiddleware,
  cookieParserMiddleware,
  loggerMiddleware,
  missingRouteMiddleware,
  errorMiddleware,
} from "./middlewares/index.js";

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.use(cookieParserMiddleware);

app.use("/api/users", userRouter);

app.use(missingRouteMiddleware);
app.use(errorMiddleware);

export default app;
