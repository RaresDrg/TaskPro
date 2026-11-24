import styled from "styled-components";
import DeleteColumnModal from "./DeleteColumnModal";
import { BREAKPOINTS } from "../../../../constants";

const StyledDeleteColumnModal = styled(DeleteColumnModal)`
  & {
    .modal-content {
      & {
        > div {
          & {
            > p {
              margin: 40px auto;
              text-align: center;
              font-weight: 400;
              font-size: 1rem;
              line-height: 1.5;
              letter-spacing: -0.02em;
              color: ${({ theme }) =>
                theme.value === "dark"
                  ? "var(--text-color-light)"
                  : "var(--text-color-dark)"};
              transition: var(--transition);

              & {
                > b {
                  font-weight: 500;
                  overflow-wrap: anywhere;
                  color: ${({ theme }) =>
                    theme.value === "violet"
                      ? "var(--violet-color-active)"
                      : "var(--green-color-active)"};
                  transition: var(--transition);
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
              > p {
                font-size: 1.125rem;
                width: 280px;
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledDeleteColumnModal;
