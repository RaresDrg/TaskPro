import styled from "styled-components";
import LogoutModal from "./LogoutModal";
import { BREAKPOINTS } from "../../../../constants";

const StyledLogoutModal = styled(LogoutModal)`
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
              }
            }
          }
        }
      }
    }
  }
`;

export default StyledLogoutModal;
