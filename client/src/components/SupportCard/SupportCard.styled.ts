import styled from "styled-components";
import SupportCard from "./SupportCard";
import { BREAKPOINTS } from "../../constants";

const StyledSupportCard = styled(SupportCard)`
  margin-left: 14px;
  margin-right: 14px;
  margin-bottom: 24px;
  padding: 14px;
  border-radius: 8px;
  border: 0.2px solid
    ${({ theme }) => {
      if (theme.value === "dark") return "#ffffff1a";
      if (theme.value === "light") return "#1616161a";
      if (theme.value === "violet") return "#ffffff66";
    }};
  box-shadow: 0px 4px 16px 0px
    ${({ theme }) => {
      if (theme.value === "dark") return "#8080801a";
      if (theme.value === "light") return "#1111111a";
      if (theme.value === "violet") return "#11111133";
    }};
  background-color: ${({ theme }) => {
    if (theme.value === "dark") return "#1F1F1F";
    if (theme.value === "light") return "#F6F6F7";
    if (theme.value === "violet") return "#ECEDFD66";
  }};
  transition: var(--transition);

  & {
    > p {
      font-weight: 400;
      font-size: 0.875rem;
      line-height: 1.33;
      letter-spacing: -0.02em;
      color: ${({ theme }) =>
        theme.value === "light"
          ? "var(--text-color-dark)"
          : "var(--text-color-light)"};
      transition: var(--transition);

      & {
        > b {
          font-weight: 500;
          color: ${({ theme }) =>
            theme.value === "violet"
              ? "var(--violet-color-active)"
              : "var(--green-color-active)"};
          transition: var(--transition);
        }
      }
    }

    > div {
      margin-top: 14px;
      display: flex;
      align-items: center;
      gap: 8px;

      & {
        > span {
          color: ${({ theme }) =>
            theme.value === "light"
              ? "var(--text-color-dark)"
              : "var(--text-color-light)"};
          transition: var(--transition);
        }

        > button {
          display: flex;
          align-items: center;
          gap: 5px;
          color: ${({ theme }) =>
            theme.value === "light"
              ? "var(--text-color-dark)"
              : "var(--text-color-light)"};
          transition: var(--transition);

          &:hover,
          &:focus-visible {
            opacity: 0.5;
          }

          & {
            > span {
              font-weight: 500;
              font-size: 0.875rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
            }

            > svg {
              width: 20px;
              height: 20px;
              fill: none;
              stroke: currentColor;
            }
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    margin-left: 24px;
    margin-right: 24px;
    margin-bottom: 30px;

    & {
      > p {
        font-size: 1rem;
      }

      > div {
        & {
          button {
            & {
              > span {
                font-size: 1rem;
              }

              > svg {
                width: 22px;
                height: 22px;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledSupportCard;
