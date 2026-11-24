import "styled-components";
import type { User } from "./app.types";

declare module "styled-components" {
  export interface DefaultTheme {
    value: User["theme"] | undefined;
  }
}
