import cors from "cors";
import { IN_DEVELOPMENT } from "../config/config-env.js";

const corsMiddleware = cors({
  origin: IN_DEVELOPMENT
    ? ["http://localhost:5173", "http://www.localhost:5173"]
    : ["https://taskpro-beryl.vercel.app"],
  credentials: true,
});

export default corsMiddleware;
