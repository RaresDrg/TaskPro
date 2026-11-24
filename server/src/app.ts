import express from "express";
import helmet from "helmet";
import rootRouter from "./routes/rootRouter.js";
import {
  bodyProcessingMiddleware,
  cookieParserMiddleware,
  corsMiddleware,
  disableCacheMiddleware,
  errorMiddleware,
  loggerMiddleware,
  missingRouteMiddleware,
  rateLimitMiddleware,
} from "./middlewares/index.js";

const app = express();

app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(helmet());
app.use(disableCacheMiddleware);
app.use(rateLimitMiddleware);
app.use(bodyProcessingMiddleware);
app.use(cookieParserMiddleware);
app.use(rootRouter);
app.use(missingRouteMiddleware);
app.use(errorMiddleware);

export default app;
