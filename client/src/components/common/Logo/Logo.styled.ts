import styled from "styled-components";
import Logo from "./Logo";
import { BREAKPOINTS } from "../../../constants";

const StyledLogo = styled(Logo)`
  display: flex;
  align-items: center;
  gap: 14px;

  & {
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: ${({ theme }) =>
        theme.value === "violet" ? "#ECEDFD" : "#1F1F1F"};
      transition: var(--transition);

      & {
        > svg {
          width: 15px;
          height: 20px;
          fill: ${({ theme }) =>
            theme.value === "violet" ? "#5255BC" : "#FFFFFF"};
          transition: var(--transition);
        }
      }
    }

    > span {
      font-weight: 600;
      font-size: 1.75rem;
      line-height: 1.5;
      letter-spacing: -0.04em;
      color: ${({ theme }) =>
        theme.value === "dark" || theme.value === "violet"
          ? "var(--text-color-light)"
          : "var(--text-color-dark)"};
      transition: var(--transition);
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      > div {
        width: 48px;
        height: 48px;

        & {
          > svg {
            width: 18px;
            height: 24px;
          }
        }
      }

      > span {
        font-size: 2.5rem;
      }
    }
  }
`;

export default StyledLogo;
