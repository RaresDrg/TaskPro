import cors from "cors";
import { IN_DEVELOPMENT } from "../config/config-env";

// todo: test in prod la change password cu token: undefined

const corsMiddleware = cors({
  origin: IN_DEVELOPMENT
    ? ["http://localhost:5173", "http://www.localhost:5173"]
    : ["https://taskpro-beryl.vercel.app"],
  credentials: true,
});

export default corsMiddleware;
