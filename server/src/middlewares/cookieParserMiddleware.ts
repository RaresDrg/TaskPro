import cookieParser from "cookie-parser";
import { COOKIE_PARSER_SECRET } from "../config/config-env";

const cookieParserMiddleware = cookieParser(COOKIE_PARSER_SECRET);

export default cookieParserMiddleware;
