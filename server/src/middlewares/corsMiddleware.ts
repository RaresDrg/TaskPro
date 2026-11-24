import cors from "cors";
import { envVariables } from "../config/index.js";

const corsMiddleware = cors({
  origin: envVariables.IN_DEVELOPMENT,
  credentials: envVariables.IN_DEVELOPMENT,
});

export default corsMiddleware;
