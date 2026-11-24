import styled from "styled-components";
import LogoutBtn from "./LogoutBtn";
import { BREAKPOINTS } from "../../constants";

const StyledLogoutBtn = styled(LogoutBtn)`
  margin-left: 14px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  opacity: 0.75;
  transition: var(--transition);

  & {
    > svg {
      width: 30px;
      height: 30px;
      fill: none;
      stroke: ${({ theme }) =>
        theme.value === "violet"
          ? "var(--text-color-light)"
          : "var(--green-color-active)"};
      transition: var(--transition);
    }

    > span {
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.5;
      position: relative;
      color: ${({ theme }) =>
        theme.value === "light"
          ? "var(--text-color-dark)"
          : "var(--text-color-light)"};
      transition: var(--transition);

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 1px;
        width: 0;
        border-radius: 50%;
        transition: var(--transition);
      }
    }
  }

  &:hover,
  &:focus-visible {
    opacity: 1;

    & {
      > svg {
        transform: scale(1.15);
        stroke: var(--error-color);
      }

      > span::after {
        width: 100%;
        background-color: var(--error-color);
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    margin-left: 24px;
    margin-bottom: 24px;

    & {
      > svg {
        width: 32px;
        height: 32px;
      }

      > span {
        font-size: 1rem;
      }
    }
  }
`;

export default StyledLogoutBtn;
