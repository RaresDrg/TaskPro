import styled from "styled-components";
import ThemeDropdown from "./ThemeDropdown";
import { BREAKPOINTS } from "../../constants";

const StyledThemeDropdown = styled(ThemeDropdown)`
  margin-left: auto;
  position: relative;

  & {
    .dropdown-trigger {
      display: flex;
      align-items: center;
      gap: 4px;
      position: relative;
      opacity: 0.7;
      color: ${({ theme }) =>
        theme.value === "dark"
          ? "var(--text-color-light)"
          : "var(--text-color-dark)"};
      transition: var(--transition);

      & {
        > span {
          font-weight: 500;
          font-size: 0.875rem;
          line-height: 1.5;
          letter-spacing: -0.02em;
        }

        > svg {
          width: 16px;
          height: 16px;
          fill: none;
          stroke: currentColor;
          transition: var(--transition);
        }
      }

      &::after {
        content: "";
        position: absolute;
        bottom: -1px;
        right: 0;
        background-color: ${({ theme }) =>
          theme.value === "violet"
            ? "var(--violet-color)"
            : "var(--green-color)"};
        height: 1.5px;
        width: 0;
        opacity: 0;
        transition: var(--transition);
      }

      &:hover,
      &:focus-visible {
        opacity: 1;
      }

      &:has(+ .dropdown-list) {
        opacity: 1;

        &::after {
          width: 100%;
          opacity: 1;
          left: 0;
        }

        & {
          > svg {
            transform: rotate(-180deg);
          }
        }
      }
    }

    .dropdown-list {
      position: absolute;
      right: 50%;
      transform: translateX(50%);
      z-index: 50;
      width: 100px;
      padding: 18px;
      border-radius: 8px;
      border: 0.3px solid #808080cc;
      outline: none;
      box-shadow: 0px 4px 16px 0px #1111111a;
      color: ${({ theme }) => (theme.value === "dark" ? "#151515" : "#FCFCFC")};
      background-color: currentColor;
      transition: var(--transition);
      animation: showDropdown 0.35s ease-in-out both;

      &.hidden {
        animation: hideDropdown 0.35s ease-in-out both;
      }

      &::before {
        content: "";
        position: absolute;
        top: -10px;
        right: 50%;
        transform: translateX(50%) rotate(-45deg);
        width: 20px;
        height: 20px;
        background-color: currentColor;
        border: 0.3px solid #808080cc;
        border-bottom-color: transparent;
        border-left-color: transparent;
      }

      & {
        > li {
          &:not(:last-of-type) {
            margin-bottom: 4px;
          }

          & {
            > button {
              font-weight: 400;
              font-size: 0.875rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              text-transform: capitalize;
              color: ${({ theme }) =>
                theme.value === "dark"
                  ? "var(--text-color-light)"
                  : "var(--text-color-dark)"};
              opacity: 0.5;
              transition: var(--transition);

              &.active {
                opacity: 1;
                font-weight: 500;
                color: ${({ theme }) =>
                  theme.value === "violet"
                    ? "var(--violet-color-active)"
                    : "var(--green-color-active)"};
              }

              &:not(.active) {
                &:hover,
                &:focus-visible {
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
  }

  @media (min-width: ${BREAKPOINTS.tablet}) {
    & {
      .dropdown-trigger {
        & {
          > span {
            font-size: 1rem;
          }

          > svg {
            width: 18px;
            height: 18px;
          }
        }
      }

      .dropdown-list {
        & {
          > li {
            & {
              > button {
                font-size: 1rem;
              }
            }
          }
        }
      }
    }
  }

  @keyframes showDropdown {
    from {
      opacity: 0;
      top: calc(100% + 10px);
    }

    to {
      opacity: 1;
      top: calc(100% + 25px);
    }
  }

  @keyframes hideDropdown {
    from {
      opacity: 1;
      top: calc(100% + 25px);
    }

    to {
      opacity: 0;
      top: calc(100% + 10px);
    }
  }
`;

export default StyledThemeDropdown;
