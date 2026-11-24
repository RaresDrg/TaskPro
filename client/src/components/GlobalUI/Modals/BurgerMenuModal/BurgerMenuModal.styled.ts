import styled from "styled-components";
import BurgerMenuModal from "./BurgerMenuModal";

const StyledBurgerMenuModal = styled(BurgerMenuModal)`
  && {
    padding: 0;

    & {
      .modal-content {
        margin: 0;
        min-width: var(--layout-min-width);
        pointer-events: none;
        animation: none;

        & {
          > aside {
            height: 100%;
            min-height: fit-content;
            pointer-events: auto;
            animation: slideIn 0.35s ease-in-out both;
          }
        }
      }
    }

    &.hidden {
      & {
        .modal-content {
          animation: none;

          & {
            > aside {
              animation: slideOut 0.35s ease-in-out both;
            }
          }
        }
      }
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-100%);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideOut {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-100%);
    }
  }
`;

export default StyledBurgerMenuModal;
