import styled from "styled-components";
import LeftSidebar from "./LeftSidebar";
import { BREAKPOINTS } from "../../../constants";

const StyledLeftSidebar = styled(LeftSidebar)`
  display: flex;
  flex-direction: column;
  width: 257px;
  border-right: 1px solid #80808033;
  background-color: ${({ theme }) => {
    if (theme.value === "dark") return "#121212";
    if (theme.value === "light") return "#FFFFFF";
    if (theme.value === "violet") return "#5255BC";
  }};
  transition: var(--transition);

  & {
    .logo {
      gap: 8px;
      width: fit-content;
      margin: 14px 0 70px 14px;

      & {
        > div {
          width: 30px;
          height: 30px;

          & {
            > svg {
              width: 12px;
              height: 16px;
            }
          }
        }

        > span {
          font-size: 1rem;
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    width: 305px;

    & {
      .logo {
        margin: 24px 0 70px 24px;

        & {
          > div {
            width: 32px;
            height: 32px;
          }

          > span {
            font-size: 1.125rem;
          }
        }
      }
    }
  }
`;

export default StyledLeftSidebar;
