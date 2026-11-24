import styled from "styled-components";
import FiltersModal from "./FiltersModal";
import { BREAKPOINTS } from "../../../../constants";

const StyledFiltersModal = styled(FiltersModal)`
  & {
    .modal-content {
      & {
        > div {
          & {
            .actions {
              margin-top: 14px;
              padding-top: 14px;
              position: relative;
              border-top: 1px solid
                ${({ theme }) =>
                  theme.value === "dark" ? "#ffffff1a" : "#1616161a"};
              transition: var(--transition);

              & {
                > h3 {
                  margin-bottom: 14px;
                  font-weight: 500;
                  font-size: 0.875rem;
                  line-height: 1.5;
                  letter-spacing: -0.02em;
                  color: ${({ theme }) =>
                    theme.value === "dark"
                      ? "var(--text-color-light)"
                      : "var(--text-color-dark)"};
                  transition: var(--transition);
                }

                .show-all-btn {
                  position: absolute;
                  top: 14px;
                  right: 0;
                  font-weight: 400;
                  font-size: 0.75rem;
                  line-height: 1.5;
                  letter-spacing: -0.02em;
                  text-decoration: underline;
                  color: ${({ theme }) =>
                    theme.value === "dark"
                      ? "var(--text-color-light)"
                      : "var(--text-color-dark)"};
                  opacity: 0.5;
                  transition: var(--transition);

                  &:hover,
                  &:focus-visible {
                    opacity: 1;
                  }
                }

                .priority-btn {
                  display: flex;
                  align-items: center;
                  gap: 8px;

                  &:not(:last-of-type) {
                    margin-bottom: 8px;
                  }

                  & {
                    &[data-priority="without"] {
                      color: var(--priority-without-color);
                    }

                    &[data-priority="low"] {
                      color: var(--priority-low-color);
                    }

                    &[data-priority="medium"] {
                      color: var(--priority-medium-color);
                    }

                    &[data-priority="high"] {
                      color: var(--priority-high-color);
                    }
                  }

                  &[aria-pressed="true"] {
                    & {
                      .circle {
                        background-color: transparent;
                        border-color: currentColor;
                        transform: scale(1.2);

                        &::before {
                          opacity: 1;
                          transform: scale(1);
                        }
                      }

                      .text {
                        opacity: 1;
                      }
                    }
                  }

                  &:not([aria-pressed="true"]) {
                    &:hover,
                    &:focus-visible {
                      & {
                        .circle {
                          border-color: #808080;
                          transform: scale(1.1);
                        }

                        .text {
                          opacity: 0.75;
                        }
                      }
                    }
                  }

                  & {
                    .circle {
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 14px;
                      height: 14px;
                      border-radius: 50%;
                      border: 1px solid transparent;
                      background-color: currentColor;
                      transition: var(--transition);

                      &::before {
                        content: "";
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        background-color: currentColor;
                        opacity: 0;
                        transform: scale(0);
                        transition: var(--transition);
                      }
                    }

                    .text {
                      text-transform: capitalize;
                      font-weight: 400;
                      font-size: 0.75rem;
                      line-height: 1.5;
                      letter-spacing: -0.02em;
                      color: ${({ theme }) =>
                        theme.value === "dark"
                          ? "var(--text-color-light)"
                          : "var(--text-color-dark)"};
                      opacity: 0.5;
                      transition: var(--transition);
                    }
                  }
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
      .modal-content {
        & {
          > div {
            & {
              .actions {
                & {
                  > h3 {
                    font-size: 1rem;
                  }

                  .show-all-btn {
                    font-size: 0.875rem;
                  }

                  .priority-btn {
                    & {
                      .circle {
                        width: 16px;
                        height: 16px;

                        &::before {
                          width: 10px;
                          height: 10px;
                        }
                      }

                      .text {
                        font-size: 0.875rem;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledFiltersModal;
