import cookieParser from "cookie-parser";
import { envVariables } from "../config/index.js";

const cookieParserMiddleware = cookieParser(envVariables.COOKIE_PARSER_SECRET);

export default cookieParserMiddleware;
